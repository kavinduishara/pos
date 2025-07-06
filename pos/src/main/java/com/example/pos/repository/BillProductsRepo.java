package com.example.pos.repository;

import com.example.pos.entities.BillProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillProductsRepo extends JpaRepository<BillProduct,Long> {
}
