package com.example.pos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shopId;

    @Column(nullable = false)
    private String shopName;

    @OneToMany(mappedBy = "shop")
    private Set<UserShop> userAssignments = new HashSet<>();


    @OneToOne
    @JoinColumn(name = "owner_user_id", nullable = false, unique = true)
    private User owner;


    public Shop(String name, User user) {
        shopName=name;
        owner=user;
    }
}
