package com.example.pos.controllers;

import com.example.pos.dto.UserDTO;
import com.example.pos.dto.UserShopDTO;
import com.example.pos.entities.Role;
import com.example.pos.entities.UserShop;
import com.example.pos.repository.ShopUserRepo;
import com.example.pos.service.JWTService;
import com.example.pos.service.MyUserDetailsService;
import com.example.pos.service.ShopService;
import com.example.pos.service.UserShopService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    MyUserDetailsService userDetailsService;
    @Autowired
    ShopService shopService;
    @Autowired
    ShopUserRepo shopUserRepo;
    @Autowired
    UserShopService userShopService;

    @Autowired
    JWTService jwtService;


    private Long getShopFromToken(HttpServletRequest request){
        String token=jwtService.getToken(request);
        return jwtService.getShopId(token);
    }
    @GetMapping("/getUser")
    public UserDTO getUser(UserDTO userDTO){
        return (UserDTO) userDetailsService.loadUserByUsername(userDTO.getEmail());
    }
    @PostMapping("/getnewusers")
    public ResponseEntity<?> getNewUser(HttpServletRequest request){

        return userShopService.getRoleAndUser(getShopFromToken(request), Role.USER);
    }
    @PostMapping("/getadminusers")
    public ResponseEntity<?> getAdminUser(HttpServletRequest request){
        return userShopService.getRoleAndUser(getShopFromToken(request), Role.ADMIN);
    }
    @PostMapping("/getcacherusers")
    public ResponseEntity<?> getCacheUser(HttpServletRequest request){
        return userShopService.getRoleAndUser(getShopFromToken(request), Role.CACHE);
    }

    @PutMapping("/setrole")
    public ResponseEntity<?> setUserRole(@RequestBody UserShopDTO userShop, HttpServletRequest request){
        if(userShop.getRole()==Role.ADMIN){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("this is not for set to admin");
        }
        if(!Objects.equals(userShop.getShopDTO().getShopId(), getShopFromToken(request))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("this is not your shop");
        }

        return userShopService.setRole(userShop);
    }
    @PutMapping("/changeadminsrole")
    public ResponseEntity<?> changeAdminsRole(@RequestBody UserShopDTO userShop, HttpServletRequest request){
        if(!Objects.equals(userShop.getShopDTO().getShopId(), getShopFromToken(request))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("this is not your shop");
        }

        return userShopService.setAdminsRole(userShop);
    }
    @PutMapping("/setroletoadmin")
    public ResponseEntity<?> setRoleToAdmin(@RequestBody UserShopDTO userShop, HttpServletRequest request){
        if(userShop.getRole()!=Role.ADMIN){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("this is only for set to admin");
        }
        if(!Objects.equals(userShop.getShopDTO().getShopId(), getShopFromToken(request))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("this is not your shop");
        }

        return userShopService.setRole(userShop);
    }
}
