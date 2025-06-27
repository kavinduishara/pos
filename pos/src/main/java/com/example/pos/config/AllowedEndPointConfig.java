package com.example.pos.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class AllowedEndPointConfig {
    private String[] endpoints= new String[]{""};

    public void setEndpoints(String... endpoints) {
        this.endpoints = endpoints;
    }
}
