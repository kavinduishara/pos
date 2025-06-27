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
@IdClass(UserShopPk.class)
public class UserShop {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    private Shop shop;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime joinedAt;

}

