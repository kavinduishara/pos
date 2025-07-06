package com.example.pos.entities;

import com.example.pos.dto.ShopDTO;
import com.example.pos.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billId;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User issuedBy;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Shop issuedIn;

    @JoinColumn(nullable = false)
    private LocalDateTime issuedAt;

    @Column(nullable = false)
    private Float total;

    @OneToMany(mappedBy = "bill")
    @JsonIgnore
    private Set<BillProduct> billProducts;

    public Bill(User user, Shop shop, LocalDateTime now,Float total) {
        this.issuedBy = user;

        this.issuedIn = shop;

        this.issuedAt = now;
        this.total = total;
    }
}
