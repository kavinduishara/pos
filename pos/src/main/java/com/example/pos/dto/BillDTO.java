package com.example.pos.dto;

import com.example.pos.entities.Bill;
import com.example.pos.entities.BillProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillDTO {
    private Long billId;
    private ShopDTO shop;
    private UserDTO user;
    private LocalDateTime issuedAt;
    private Set<BillProductDTO> billProducts;
    private Float total;
    private Float payment;


    public static BillDTO billToDTO(Bill bill){

        Set<BillProductDTO> billProductDTOS=bill.getBillProducts().stream().map(BillProductDTO::billProductToDTO).collect(Collectors.toSet());
        return new BillDTO(
                bill.getBillId(),
                ShopDTO.shopToDTO(bill.getIssuedIn()),
                UserDTO.userToDTO(bill.getIssuedBy()),
                bill.getIssuedAt(),
                billProductDTOS,
                bill.getTotal(),
                bill.getPayment()
        );
    }
//    public static Bill dTOtoBill(BillDTO bill){
//        return new Bill(
//                bill.getBillId(),
//                ShopDTO.shopToDTO(bill.getShop()),
//                UserDTO.userToDTO(bill.getIssuedBy()),
//                bill.getIssuedAt(),
//                bill.getBillProducts()
//        );
//    }

}
