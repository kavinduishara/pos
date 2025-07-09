package com.example.pos.controllers;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.DateDTO;
import com.example.pos.dto.ShopDTO;
import com.example.pos.dto.UserDTO;
import com.example.pos.service.BillService;
import com.example.pos.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
    public ResponseEntity<?> makeBill(@RequestBody BillDTO billDTO, HttpServletRequest request, Principal principal){
        System.out.println(billDTO.getPayment());
        billDTO.getBillProducts().forEach(System.out::println);
        System.out.println();
        billDTO.setShop(new ShopDTO(getShopFromToken(request)));
        billDTO.setUser(new UserDTO("",principal.getName()));
        return billService.makeBill(billDTO);
    }

    @PostMapping("/getbilsbitween")
    public ResponseEntity<?> getBillsBetween(@RequestBody DateDTO dateDTO,HttpServletRequest request){
        return billService.getBillsBetween(dateDTO,getShopFromToken(request));
    }
}
