package com.example.pos.controllers;

import com.example.pos.dto.ShopDTO;
import com.example.pos.service.MyUserDetailsService;
import com.example.pos.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin
@RestController
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    MyUserDetailsService userDetailsService;

    @Autowired
    ShopService shopService;

    @PostMapping("/createShop")
    public ShopDTO createShop(@RequestBody ShopDTO shop, Principal principal){
        return shopService.creteShop(shop,principal);
    }
    @GetMapping("/getshopdetails/{shopId}")
    public ShopDTO getshop(@PathVariable Long shopId){
        return shopService.getShop(shopId);
    }
}
