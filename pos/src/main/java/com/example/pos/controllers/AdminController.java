package com.example.pos.controllers;

import com.example.pos.dto.ShopDTO;
import com.example.pos.dto.UserDTO;
import com.example.pos.entities.Shop;
import com.example.pos.entities.User;
import com.example.pos.entities.UserShop;
import com.example.pos.repository.ShopUserRepo;
import com.example.pos.service.MyUserDetailsService;
import com.example.pos.service.ShopService;
import com.example.pos.service.UserShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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


    @GetMapping("/getUser")
    public UserDTO getUser(UserDTO userDTO){
        return (UserDTO) userDetailsService.loadUserByUsername(userDTO.getEmail());
    }
    @PutMapping("/")
    public ResponseEntity<?> setUserRole(@RequestBody  UserShop userShop){
        userShopService.setUserShop(userShop);
        return ResponseEntity.ok(Map.of("message", "user role set"));
    }
}
