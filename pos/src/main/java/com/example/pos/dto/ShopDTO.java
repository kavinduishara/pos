package com.example.pos.dto;

import com.example.pos.entities.Shop;
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

    public static ShopDTO shopToDTO(Shop shop){
        return new ShopDTO(shop.getShopId(),shop.getShopName(),shop.getOwner().getFullName(),shop.getOwner().getEmail());
    }
}
