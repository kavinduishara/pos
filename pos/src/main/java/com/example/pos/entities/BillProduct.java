package com.example.pos.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private float issuedQuantity;
    @Column(nullable = false)
    private float priceWhenBought;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Products product;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Bill bill;
}
