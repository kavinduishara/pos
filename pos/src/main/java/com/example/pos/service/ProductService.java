package com.example.pos.service;

import com.example.pos.dto.ProductDTO;
import com.example.pos.entities.Products;
import com.example.pos.entities.Shop;
import com.example.pos.repository.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductsRepo productsRepo;

    public ResponseEntity<?> addProduct(ProductDTO products) {
        Shop shop=new Shop(products.getShopId());
        Products products1=new Products(
                products.getProductName(),
                products.getUnitPrice(),
                products.getUnit(),
                products.getQuantity(),
                shop
                );
        return ResponseEntity.ok(productsRepo.save(products1));
    }

    public ResponseEntity<?> changeProduct(ProductDTO products) {
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

        return ResponseEntity.ok(ProductDTO.productToDTO(productsRepo.save(products1)));
    }
    public List<ProductDTO> getProductLike(String prod,Long shop){
        return productsRepo.findByProductNameStartsWith(prod,new Shop(shop)).stream().map(ProductDTO::productToDTO).toList();
    }
}
