package com.example.pos.service;

import com.example.pos.dto.ShopDTO;
import com.example.pos.entities.Shop;
import com.example.pos.entities.User;
import com.example.pos.repository.ShopRepo;
import com.example.pos.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
public class ShopService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ShopRepo shopRepo;

    @Autowired
    private JWTService jwtService;

    public ShopDTO creteShop(ShopDTO shopDTO, Principal principal){
        User user=userRepo.findByEmail(principal.getName());
        Shop shop=shopRepo.save(new Shop(shopDTO.getShopName(), user));
        return new ShopDTO(shop.getShopName(),shop.getOwner().getFullName(),shop.getOwner().getEmail());
    }
    public ShopDTO getShop(Long shop){
        Optional<Shop> shop1=shopRepo.findById(shop);
        if (shop1.isEmpty()){
            return new ShopDTO();
        }
        Shop shop2 =shop1.get();
        User owner=shop2.getOwner();
        return new ShopDTO(shop2.getShopName(),owner.getFullName(),owner.getEmail());
    }
}
