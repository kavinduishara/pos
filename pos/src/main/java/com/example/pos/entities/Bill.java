package com.example.pos.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @OneToMany(mappedBy = "bill")
    @JsonIgnore
    private Set<BillProduct> billProducts;
}
