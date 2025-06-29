package com.example.pos.controllers;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.ShopDTO;
import com.example.pos.entities.Products;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cacher")
public class CacherController {

    @PostMapping("/makeBill")
    public BillDTO makeBill(@RequestBody BillDTO billDTO, Principal principal){
        return billDTO;
    }
    @GetMapping("/getallbils")
    public List<BillDTO> getShopBills(@RequestBody ShopDTO shopDTO){
        return new ArrayList<>();
    }
    @GetMapping("/checkunitprice")
    public float getUnitPrice(@RequestBody Products products){
        return products.getUnitPrice();
    }
    @GetMapping("/shopproducts")
    public Products getAllProducts(@RequestBody ShopDTO shopDTO){
        return new Products();
    }
}
