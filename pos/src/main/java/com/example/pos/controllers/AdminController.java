package com.example.pos.controllers;

import com.example.pos.dto.ShopDTO;
import com.example.pos.dto.UserDTO;
import com.example.pos.entities.Role;
import com.example.pos.entities.UserShop;
import com.example.pos.repository.ShopUserRepo;
import com.example.pos.service.MyUserDetailsService;
import com.example.pos.service.ShopService;
import com.example.pos.service.UserShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @PostMapping("/getnewusers")
    public List<UserDTO> getNewUser(@RequestBody ShopDTO shopDTO){
        return userShopService.getRoleAndUser(shopDTO, Role.USER);
    }
    @PostMapping("/getadminusers")
    public List<UserDTO> getAdminUser(@RequestBody ShopDTO shopDTO){
        return userShopService.getRoleAndUser(shopDTO, Role.ADMIN);
    }
    @PostMapping("/getcacherusers")
    public List<UserDTO> getCacheUser(@RequestBody ShopDTO shopDTO){
        return userShopService.getRoleAndUser(shopDTO, Role.CACHE);
    }
    @PutMapping("/setrole")
    public UserShop setUserRole(@RequestBody  UserShop userShop){

        return userShopService.setUserShop(userShop);
    }
}
