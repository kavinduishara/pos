package com.example.pos.controllers;

import com.example.pos.dto.ShopDTO;
import com.example.pos.dto.UserDTO;
import com.example.pos.dto.UserShopDTO;
import com.example.pos.entities.Shop;
import com.example.pos.entities.User;
import com.example.pos.entities.UserShop;
import com.example.pos.service.MyUserDetailsService;
import com.example.pos.service.ShopService;
import com.example.pos.service.UserService;
import com.example.pos.service.UserShopService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

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

    @Autowired
    UserService userService;

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
    @GetMapping("/getall")
    public List<ShopDTO> getlist(Principal principal){
        return shopService.getShopList(principal);
    }
    @PostMapping("/apply")
    public UserShopDTO addMeToShop(@RequestBody ShopDTO shopDTO, Principal principal){

        UserShop userShop= userShopService.makeUserShop(shopDTO,principal);
        Shop shop=userShop.getShop();
        User user=userShop.getUser();
        ShopDTO shopDTO1=new ShopDTO(shop.getShopId(),shop.getShopName(),shop.getOwner().getFullName(),shop.getOwner().getEmail());
        UserDTO userDTO=new UserDTO(user.getFullName(),user.getEmail());
        return new UserShopDTO(userDTO,shopDTO1,userShop.getRole(),userShop.getJoinedAt());
    }
    @PostMapping("/enter")
    public ResponseEntity<Map<String, String>> enterToShop(@RequestBody ShopDTO shop, HttpServletResponse response,Principal principal) {

        System.out.println(principal.getName());

        if (!userShopService.isUserShopPresent(shop.getShopId(), principal.getName())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "there is no role for you in this store"));
        }

        return userService.enterToShop(principal.getName(), response,shop.getShopId());
    }

}