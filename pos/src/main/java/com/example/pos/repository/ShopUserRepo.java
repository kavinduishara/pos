package com.example.pos.repository;

import com.example.pos.entities.User;
import com.example.pos.entities.UserShop;
import com.example.pos.entities.UserShopPk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShopUserRepo extends JpaRepository<UserShop, UserShopPk> {
    List<UserShop> findAllByUser(User user);
}
