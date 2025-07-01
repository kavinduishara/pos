package com.example.pos.dto;

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
    private float unitPrice;
    private String unit;
    private float quantity;
    private Long shopId;
}
