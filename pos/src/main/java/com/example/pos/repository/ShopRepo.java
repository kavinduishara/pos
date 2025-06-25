package com.example.pos.repository;

import com.example.pos.entities.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepo extends JpaRepository<Shop,Long> {
}
