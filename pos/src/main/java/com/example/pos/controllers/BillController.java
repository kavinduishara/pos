package com.example.pos.controllers;

import com.example.pos.dto.BillDTO;
import com.example.pos.dto.DateDTO;
import com.example.pos.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/billing")
public class BillController {

    @Autowired
    BillService billService;

    @PostMapping("/makebill")
    public ResponseEntity<?> makeBill(@RequestBody BillDTO billDTO){
        return billService.makeBill(billDTO);
    }

    @PostMapping("/getbilsbitween")
    public ResponseEntity<?> getBillsBetween(@RequestBody DateDTO dateDTO){
        return billService.getBillsBetween(dateDTO);
    }
}
