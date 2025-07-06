package com.example.pos.controllers;

import com.example.pos.dto.UserDTO;
import com.example.pos.entities.User;
import com.example.pos.service.JWTService;
import com.example.pos.service.MyUserDetailsService;
import com.example.pos.service.UserService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    MyUserDetailsService userDetailsService;


    @Autowired
    JWTService jwtService;

    @PostMapping("/register")
    public UserDTO register(@RequestBody User user){
        return userService.saveUser(user);
    }
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> login(@RequestBody User user){
//        return UserService.verify(user);
//    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user, HttpServletResponse response) {

        return userService.verify(user, response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refresh_token", required = false) String refreshToken,
                                          HttpServletResponse response) {

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing refresh token cookie");
        }

        try {
            if (jwtService.isAccessToken(refreshToken)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not a refresh token");
            }

            if (jwtService.isTokenExpired(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token expired");
            }

            String username = jwtService.extractUserName(refreshToken);
            Long shopId= (Long) jwtService.getShopId(refreshToken);
            String newAccessToken = jwtService.generateAccessToken(username,shopId);

            // Set new access token in cookie
            Cookie newAccessCookie = new Cookie("access_token", newAccessToken);
            newAccessCookie.setHttpOnly(true);
            newAccessCookie.setSecure(true);
            newAccessCookie.setPath("/");
            newAccessCookie.setMaxAge(15 * 60); // 15 mins

            response.addCookie(newAccessCookie);

            return ResponseEntity.ok(Map.of("message", "Access token refreshed"));

        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }


}
