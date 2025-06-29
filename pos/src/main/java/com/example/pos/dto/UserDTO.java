package com.example.pos.dto;

import com.example.pos.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private String fullName;
    private String email;

    public static UserDTO userToDTO(User user){
        return new UserDTO(user.getFullName(), user.getEmail());
    }
}
