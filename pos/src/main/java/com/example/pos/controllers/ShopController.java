package com.example.pos.controllers;

import com.example.pos.dto.ShopDTO;
import com.example.pos.dto.UserDTO;
import com.example.pos.dto.UserShopDTO;
import com.example.pos.entities.Shop;
import com.example.pos.entities.User;
import com.example.pos.entities.UserShop;
import com.example.pos.service.MyUserDetailsService;
import com.example.pos.service.ShopService;
import com.example.pos.service.UserShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    MyUserDetailsService userDetailsService;

    @Autowired
    ShopService shopService;

    @Autowired
    UserShopService userShopService;

    @PostMapping("/createShop")
    public ShopDTO createShop(@RequestBody ShopDTO shop, Principal principal){
        return shopService.creteShop(shop,principal);
    }
    @GetMapping("/getshopdetails/{shopId}")
    public ShopDTO getshop(@PathVariable Long shopId){
        return shopService.getShop(shopId);
    }
    @GetMapping("/getmyshoplist")
    public List<UserShopDTO> getmyshoplist(Principal principal){
        return shopService.getMyShops(principal);
    }
    @PostMapping("/aplly")
    public UserShopDTO addMeToShop(@RequestBody ShopDTO shopDTO, Principal principal){

        UserShop userShop= userShopService.makeUserShop(shopDTO,principal);
        Shop shop=userShop.getShop();
        User user=userShop.getUser();
        ShopDTO shopDTO1=new ShopDTO(shop.getShopId(),shop.getShopName(),shop.getOwner().getFullName(),shop.getOwner().getEmail());
        UserDTO userDTO=new UserDTO(user.getFullName(),user.getEmail());
        return new UserShopDTO(userDTO,shopDTO1,userShop.getRole(),userShop.getJoinedAt());
    }
}
