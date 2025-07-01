package com.example.pos.service;

import com.example.pos.entities.Products;
import com.example.pos.repository.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.stereotype.Service;

@Service
public class StoreService {
    @Autowired
    ProductsRepo productsRepo;
    public Products addProducts(Products products) {
        return productsRepo.save(products);
    }
}
