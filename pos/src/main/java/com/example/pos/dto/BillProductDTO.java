package com.example.pos.dto;

import com.example.pos.entities.Bill;
import com.example.pos.entities.BillProduct;
import com.example.pos.entities.Products;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillProductDTO {

    private Long billProductId;

    private Float issuedQuantity;
    private Float priceWhenBought;

    private Float price;
    private Long productId;
    private String productName;

    private String unit;

    private Long billId;

    public static BillProductDTO billProductToDTO(BillProduct billProduct) {
        BillProductDTO dto = new BillProductDTO();
        dto.setBillProductId(billProduct.getBillProductId());
        dto.setIssuedQuantity(billProduct.getIssuedQuantity());
        dto.setPriceWhenBought(billProduct.getPriceWhenBought());
        dto.setPrice(billProduct.getPrice());


        if (billProduct.getProduct() != null) {
            dto.setProductId(billProduct.getProduct().getProductId());
            dto.setProductName(billProduct.getProduct().getProductName());
            dto.setUnit(billProduct.getProduct().getUnit());
        }

        if (billProduct.getBill() != null) {
            dto.setBillId(billProduct.getBill().getBillId());
        }

        return dto;
    }

}
