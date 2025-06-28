package com.example.pos.service;

import com.example.pos.dto.ShopDTO;
import com.example.pos.entities.*;
import com.example.pos.repository.ShopRepo;
import com.example.pos.repository.ShopUserRepo;
import com.example.pos.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;

@Service
public class UserShopService {
    @Autowired
    ShopUserRepo shopUserRepo;

    @Autowired
    ShopRepo shopRepo;

    @Autowired
    UserRepo userRepo;

    public UserShop setUserShop(UserShop userShop){
        UserShop userShop1=shopUserRepo.findById(new UserShopPk(
                userRepo.findByEmail(userShop.getUser().getUsername()),
                shopRepo.findById(userShop.getShop().getShopId()).get()
        )).get();
        userShop1.setRole(userShop.getRole());
        return shopUserRepo.save(userShop1);
    }

    public UserShop makeUserShop(ShopDTO shopDTO, Principal principal) {
        UserShop userShop=shopUserRepo.save(
                new UserShop(
                        userRepo.findByEmail(principal.getName()),
                        shopRepo.findById(shopDTO.getShopId()).get(),
                        Role.USER,
                        LocalDateTime.now()
                        ));
        return shopUserRepo.save(userShop);
    }
}
