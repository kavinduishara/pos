package com.example.pos.dto;

import com.example.pos.entities.Products;
import com.example.pos.entities.Shop;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductDTO {
    private Long productId ;

    private String productName;
    private Float unitPrice;
    private String unit;
    private Float quantity;
    private Long shopId;

    public ProductDTO(String productName, float unitPrice, String unit, float quantity, Long shopId) {
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.unit = unit;
        this.quantity = quantity;
        this.shopId = shopId;
    }
    public static ProductDTO productToDTO(Products products){
        return new ProductDTO(
                products.getProductId(),
                products.getProductName(),
                products.getUnitPrice(),
                products.getUnit(),
                products.getQuantity(),
                products.getShop().getShopId()
        );
    }
}
