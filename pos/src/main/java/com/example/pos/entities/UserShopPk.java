package com.example.pos.entities;

import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;


@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserShopPk implements Serializable {
    private User user;
    private Shop shop;
}
