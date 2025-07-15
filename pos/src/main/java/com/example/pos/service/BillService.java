package com.example.pos.service;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.DateDTO;
import com.example.pos.entities.*;
import com.example.pos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    public ResponseEntity<?> makeBill(BillDTO billDTO) {
        User user = userRepo.findByEmail(billDTO.getUser().getEmail());
        Shop shop = shopRepo.findById(billDTO.getShop().getShopId()).orElse(null);
        if (shop == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid shop ID");
        }

        final Float[] total = {0f};
        final StringBuilder error = new StringBuilder();
        List<BillProduct> billProductList = new ArrayList<>();

        Bill tempBill = new Bill(user, shop, LocalDateTime.now(), 0f, billDTO.getPayment());

        for (BillProductDTO billProductDTO : billDTO.getBillProducts()) {
            Optional<Products> optionalProduct = productsRepo.findById(billProductDTO.getProductId());

            if (optionalProduct.isEmpty()) {
                error.append("Product not found: ")
                        .append(billProductDTO.getProductId())
                        .append(" - ")
                        .append(billProductDTO.getProductName())
                        .append("\n");
                continue;
            }

            Products product = optionalProduct.get();
            if (product.getQuantity() < billProductDTO.getIssuedQuantity()) {
                error.append("Only ")
                        .append(product.getQuantity())
                        .append(product.getUnit())
                        .append(" of ")
                        .append(product.getProductName())
                        .append(" left\n");
                continue;
            }

            float priceWhenBought = product.getUnitPrice();
            float price = priceWhenBought * billProductDTO.getIssuedQuantity();
            total[0] += price;

            BillProduct billProduct = new BillProduct(
                    billProductDTO.getIssuedQuantity(),
                    priceWhenBought,
                    product.getQuantity() - billProductDTO.getIssuedQuantity(),
                    price,
                    product,
                    tempBill // Not yet saved, but can be referenced
            );

            billProductList.add(billProduct);
        }

        // Check for payment and product availability errors
        if (billDTO.getPayment() < total[0]) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Payment is not enough. Required: " + total[0]);
        }

        if (error.length() > 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error.toString());
        }

        // Save the bill only after validation passes
        tempBill.setTotal(total[0]);
        Bill savedBill = billRepo.save(tempBill);

        for (BillProduct bp : billProductList) {
            bp.setBill(savedBill);
            billProductsRepo.save(bp);

            Products product = bp.getProduct();
            product.setQuantity(product.getQuantity() - bp.getIssuedQuantity());
            productsRepo.save(product);
        }

        billDTO.setBillId(savedBill.getBillId());
        billDTO.setIssuedAt(savedBill.getIssuedAt());
        billDTO.setTotal(savedBill.getTotal());

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
