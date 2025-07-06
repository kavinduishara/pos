package com.example.pos.service;


import com.example.pos.dto.UserDTO;
import com.example.pos.entities.User;
import com.example.pos.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Map;

@Service
public class UserService {


    @Autowired
    UserRepo repo;

    @Autowired
    AuthenticationManager manager;

    @Autowired
    JWTService jwtService;


    private final BCryptPasswordEncoder encoder =new BCryptPasswordEncoder(12);

    public UserDTO saveUser(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        User user1=repo.save(user);

        return new UserDTO(user1.getFullName(),user1.getEmail());
    }
    private ResponseEntity<Map<String, String>> generateTokens(String userName, HttpServletResponse response,Long shopId) {
        String accessToken = jwtService.generateAccessToken(userName, shopId);
        String refreshToken = jwtService.generateRefreshToken(userName,shopId);

        // Set access_token cookie
        Cookie accessCookie = new Cookie("access_token", accessToken);
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(true); // only if using HTTPS
        accessCookie.setPath("/");
        accessCookie.setMaxAge(15 * 60); // 15 mins

        // Set refresh_token cookie
        Cookie refreshCookie = new Cookie("refresh_token", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true); // only if using HTTPS
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
        return ResponseEntity.ok(Map.of("message", "Login successful","fullName", (repo.findByEmail(userName).getFullName())));
    }

    public ResponseEntity<Map<String, String>> verify(User user, HttpServletResponse response) {
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())); // use actual password

        if (authentication.isAuthenticated()) {
            return generateTokens(user.getUsername(),response,0L);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }
    public ResponseEntity<Map<String, String>> enterToShop(String user, HttpServletResponse response,Long shopId) {
        return generateTokens(user,response,shopId);
    }
    public List<User> getAll() {
        return repo.findAll();
    }
}
