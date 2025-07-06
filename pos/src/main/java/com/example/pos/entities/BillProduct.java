package com.example.pos.entities;

import com.example.pos.dto.BillProductDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class BillProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billProductId;

    @Column(nullable = false)
    private Float issuedQuantity;
    @Column(nullable = false)
    private Float priceWhenBought;

    @Column(nullable = false)
    private Float price;
    @ManyToOne
    @JoinColumn(nullable = false)
    private Products product;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Bill bill;

    public BillProduct(Float issuedQuantity, Float priceWhenBought, Float price, Products product, Bill bill) {
        this.issuedQuantity = issuedQuantity;
        this.priceWhenBought = priceWhenBought;
        this.price = price;
        this.product = product;
        this.bill = bill;
    }
}
