package com.example.pos.service;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.DateDTO;
import com.example.pos.entities.*;
import com.example.pos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BillService {
    @Autowired
    BillProductsRepo billProductsRepo;

    @Autowired
    UserRepo userRepo;
    @Autowired
    ShopRepo shopRepo;

    @Autowired
    ProductsRepo productsRepo;

    @Autowired
    BillRepo billRepo;

    public ResponseEntity<?> makeBill(BillDTO billDTO){
        User user=userRepo.findByEmail(billDTO.getUser().getEmail());
        Shop shop=shopRepo.findById(billDTO.getShop().getShopId()).get();

        final Float[] total = {0f};
        Bill bill=billRepo.save(new Bill(user,shop, LocalDateTime.now(), total[0],billDTO.getPayment()));
        List<BillProduct> billProductList=new ArrayList<>();
        final String[] error = {""};
        billDTO.getBillProducts().forEach(billProduct -> {
            Optional<Products> optionalProduct=productsRepo.findById(billProduct.getProductId());
            if(optionalProduct.isEmpty()){
                error[0]=error[0]+billProduct.getProductId()+" "+ billProduct.getProductName()+" product do not exist\n";
                return;
            }
            Products product=optionalProduct.get();
            if(product.getQuantity()>=billProduct.getIssuedQuantity()){

                billProduct.setPriceWhenBought(product.getUnitPrice());
                billProduct.setProductName(product.getProductName());
                Float price = product.getUnitPrice() * billProduct.getIssuedQuantity();
                billProduct.setPrice(price);
                total[0] =price+ total[0];
                billProduct.setBillId(bill.getBillId());
                billProductList.add(new BillProduct(billProduct.getIssuedQuantity(),product.getUnitPrice(),product.getQuantity()-billProduct.getIssuedQuantity(),price,product,bill ));
            }else {
                error[0]=error[0]+" "+"only"+product.getQuantity()+product.getUnit()+" "+product.getProductName()+"left\n";
            }

        });
        if(!error[0].isEmpty()){
            return ResponseEntity.badRequest().body(error[0]);
        }


        billProductList.forEach(billProduct -> {
            billProductsRepo.save(billProduct);
            Products products=billProduct.getProduct();
            products.setQuantity(products.getQuantity()-billProduct.getIssuedQuantity());
            productsRepo.save(products);
        });
        bill.setTotal(total[0]);
        billRepo.save(bill);
        billDTO.setBillId(bill.getBillId());
        billDTO.setIssuedAt(bill.getIssuedAt());
        billDTO.setTotal(bill.getTotal());

        return ResponseEntity.ok(billDTO);
    }

    public ResponseEntity<?> getBillsBetween(DateDTO dateDTO,Long shopId) {
        List<Bill> bills=billRepo.findBillsBetweenDates(dateDTO.getFrom(),dateDTO.getTo(),new Shop(shopId));
        System.out.println(shopId);
        System.out.println(dateDTO.getFrom());
        System.out.println(dateDTO.getTo());
        System.out.println(bills);
        return ResponseEntity.ok(bills.stream().map(BillDTO::billToDTO).collect(Collectors.toSet()));
    }
}
