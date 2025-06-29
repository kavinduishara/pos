package com.example.pos.dto;

import com.example.pos.entities.Bill;
import com.example.pos.entities.BillProduct;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
public class BillDTO {
    private Long billId;
    private ShopDTO shop;
    private UserDTO user;
    private LocalDateTime issuedAt;
    private Set<BillProduct> billProducts;

    public static BillDTO billToDTO(Bill bill){
        return new BillDTO(
                bill.getBillId(), ShopDTO.shopToDTO(bill.getIssuedIn()),
                UserDTO.userToDTO(bill.getIssuedBy()),
                bill.getIssuedAt(),
                bill.getBillProducts()
        );
    }
}
