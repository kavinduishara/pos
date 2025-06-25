package com.example.pos.controllers;

import com.example.pos.dto.UserDTO;
import com.example.pos.entities.Shop;
import com.example.pos.entities.User;
import com.example.pos.entities.UserShop;
import com.example.pos.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    @Autowired
    MyUserDetailsService userDetailsService;

    @GetMapping("/")
    public String hello(){
        return "hello";
    }
//    @PostMapping("/")
//    public UserDTO add(@RequestBody User user){
//        System.out.println(user.getEmail());
//        return UserService.saveUser(user);
//    }
//    @GetMapping("/all")
//    public List<User> getAll(){
//        return userDetailsService.getAll();
//    }
}
