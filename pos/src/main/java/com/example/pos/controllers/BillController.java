package com.example.pos.controllers;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.DateDTO;
import com.example.pos.service.BillService;
import com.example.pos.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/billing")
public class BillController {

    @Autowired
    BillService billService;

    @Autowired
    JWTService jwtService;


    private Long getShopFromToken(HttpServletRequest request){
        String token=jwtService.getToken(request);
        return jwtService.getShopId(token);
    }

    @PostMapping("/makebill")
    public ResponseEntity<?> makeBill(@RequestBody BillDTO billDTO,HttpServletRequest request){
        if(!Objects.equals(billDTO.getShop().getShopId(), getShopFromToken(request))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("this is not your shop");
        }
        return billService.makeBill(billDTO);
    }

    @PostMapping("/getbilsbitween")
    public ResponseEntity<?> getBillsBetween(@RequestBody DateDTO dateDTO,HttpServletRequest request){
        return billService.getBillsBetween(dateDTO,getShopFromToken(request));
    }
}
