package com.example.pos.controllers;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.ProductDTO;
import com.example.pos.dto.ShopDTO;
import com.example.pos.entities.Products;
import com.example.pos.service.JWTService;
import com.example.pos.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("admin/store")
public class StoreController {

    @Autowired
    ProductService productService;

    @Autowired
    JWTService jwtService;


    private Long getShopFromToken(HttpServletRequest request){
        String token=jwtService.getToken(request);
        return jwtService.getShopId(token);
    }

    @GetMapping("/getallbils")
    public List<BillDTO> getShopBills(@RequestBody ShopDTO shopDTO){
        return new ArrayList<>();
    }
    @PutMapping("/changeProduct")
    public ResponseEntity<?> setProduct(@RequestBody ProductDTO products, HttpServletRequest request){
        if(!Objects.equals(products.getShopId(), getShopFromToken(request))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("this is not your shop");
        }
        return productService.changeProduct(products);
    }
    @PostMapping("/addproduct")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO products, HttpServletRequest request){
        if(!Objects.equals(products.getShopId(), getShopFromToken(request))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("this is not your shop");
        }
        return productService.addProduct(products);
    }
}
