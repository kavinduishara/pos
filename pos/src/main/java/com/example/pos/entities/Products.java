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

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<BillProduct> billProduct;
}
