package com.example.pos.repository;

import com.example.pos.entities.Bill;
import com.example.pos.entities.Products;
import com.example.pos.entities.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductsRepo extends JpaRepository<Products,Long> {
    @Query("SELECT p FROM Products p WHERE p.shop=:shop AND p.productName LIKE CONCAT(:prod, '%') ")
    List<Products> findByProductNameStartsWith(@Param("prod") String prod, @Param("shop")Shop shop);

}
