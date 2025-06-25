package com.example.pos.entities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_shop")
public class UserShop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Shop shop;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime joinedAt;
}

