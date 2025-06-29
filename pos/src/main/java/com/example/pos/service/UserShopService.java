package com.example.pos.service;

import com.example.pos.dto.ShopDTO;
import com.example.pos.dto.UserDTO;
import com.example.pos.entities.*;
import com.example.pos.repository.ShopRepo;
import com.example.pos.repository.ShopUserRepo;
import com.example.pos.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

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
        shopUserRepo.save(userShop1);
        return userShop1;
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

    public List<UserDTO> getRoleAndUser(ShopDTO shopDTO, Role role) {
        List<UserShop> userShop=shopUserRepo.findAllByShop(shopRepo.findById(shopDTO.getShopId()).get());
        return userShop.stream().filter(userShop1 -> userShop1.getRole()==role).map(userShop1 -> {
            User user=userShop1.getUser();
            return new UserDTO(user.getFullName(), user.getEmail());
        }).toList();
    }
}
