package com.example.pos.service;

import com.example.pos.dto.ProductDTO;
import com.example.pos.entities.Products;
import com.example.pos.entities.Shop;
import com.example.pos.repository.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    ProductsRepo productsRepo;

    public void addProduct(ProductDTO products) {
//        Shop shop=new Shop(products.getShopId());
//        Products products1=new Products(
//                products.getProductId(),
//                products.getProductName(),
//                products.getUnitPrice(),
//                products.getUnit(),
//                products.getQuantity(),
//                shop
//                );
//        productsRepo.save(products1);
    }
}
