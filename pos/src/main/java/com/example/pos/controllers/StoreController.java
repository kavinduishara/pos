package com.example.pos.controllers;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.ProductDTO;
import com.example.pos.dto.ShopDTO;
import com.example.pos.entities.Products;
import com.example.pos.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("admin/store")
public class StoreController {

    @Autowired
    ProductService productService;

    @GetMapping("/getallbils")
    public List<BillDTO> getShopBills(@RequestBody ShopDTO shopDTO){
        return new ArrayList<>();
    }
    @PutMapping("/changeProduct")
    public Products setProduct(@RequestBody Products products){
        return new Products();
    }
    @PostMapping("/addproduct")
    public Products addProduct(@RequestBody ProductDTO products){
        //productService.addProduct(products);
        return new ProductDTO();
    }
}
