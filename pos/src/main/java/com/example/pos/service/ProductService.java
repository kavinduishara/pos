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

    public Products addProduct(ProductDTO products) {
        Shop shop=new Shop(products.getShopId());
        Products products1=new Products(
                products.getProductName(),
                products.getUnitPrice(),
                products.getUnit(),
                products.getQuantity(),
                shop
                );
        return productsRepo.save(products1);
    }

    public ProductDTO changeProduct(ProductDTO products) {
        Products products1=productsRepo.findById(products.getProductId()).get();
        System.out.println(products.getQuantity());
        if (products.getProductName() != null) {
            products1.setProductName(products.getProductName());
        }
        if (products.getUnit() != null) {
            products1.setUnit(products.getUnit());
        }
        if (products.getQuantity() != null) {
            products1.setQuantity(products.getQuantity());
        }
        if (products.getUnitPrice() != null) {
            products1.setUnitPrice(products.getUnitPrice());
        }
        return ProductDTO.productToDTO(productsRepo.save(products1));
    }
}
