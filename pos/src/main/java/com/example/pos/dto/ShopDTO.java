package com.example.pos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopDTO {
    private Long shopId;
    private String shopName;
    private String ownerName;
    private String email;
}
