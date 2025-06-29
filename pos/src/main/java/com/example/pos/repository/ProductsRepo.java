package com.example.pos.repository;

import com.example.pos.entities.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepo extends JpaRepository<Products,Long> {
}
