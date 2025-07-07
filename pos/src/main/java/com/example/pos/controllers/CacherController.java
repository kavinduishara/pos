package com.example.pos.controllers;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.ProductDTO;
import com.example.pos.dto.ShopDTO;
import com.example.pos.entities.Products;
import com.example.pos.service.JWTService;
import com.example.pos.service.ProductService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cacher")
public class CacherController {

    @Autowired
    ProductService productService;

    @Autowired
    JWTService jwtService;
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
    @GetMapping("/product/{prod}")
    public List<ProductDTO> getProductLike(@PathVariable String prod, HttpServletRequest request){
        String token=jwtService.getToken(request);
        Long shopId=jwtService.getShopId(token);
        return productService.getProductLike(prod,shopId
        );
    }
}
