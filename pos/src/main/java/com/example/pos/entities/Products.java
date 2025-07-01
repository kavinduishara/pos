package com.example.pos.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId ;

    @Column(nullable = false)
    private String productName;
    @Column(nullable = false)
    private float unitPrice;
    @Column(nullable = false)
    private String unit;
    @Column(nullable = false)
    private float quantity;

    @ManyToOne(optional = false)
    private Shop shop;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<BillProduct> billProduct;

    public Products(Long productId, String productName, float unitPrice, String unit, float quantity, Shop shop) {
        this.productId = productId;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.unit = unit;
        this.quantity = quantity;
        this.shop = shop;
    }
}
