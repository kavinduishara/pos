package com.example.pos.dto;

import com.example.pos.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserShopDTO {
    private UserDTO userDTO;
    private ShopDTO shopDTO;
    private Role role;
    private LocalDateTime joinedAt;
}
