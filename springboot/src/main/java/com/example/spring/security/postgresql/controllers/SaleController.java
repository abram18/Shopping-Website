package com.example.spring.security.postgresql.controllers;

import com.example.spring.security.postgresql.models.Message;
import com.example.spring.security.postgresql.models.Sale;
import com.example.spring.security.postgresql.security.services.UserDetailsImpl;
import com.example.spring.security.postgresql.services.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/sale")
public class SaleController {
	
	@Autowired
    SaleService saleService;

    @GetMapping("/client")
    public ResponseEntity<List<Sale>> getByClient(){
    	UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName = userDetails.getUsername();
        return new ResponseEntity<>(saleService.getSalesByClient(userName), HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<Message> createSale(){
    	UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName = userDetails.getUsername();
        saleService.createsale(userName);
        return new ResponseEntity<>(new Message("Successful purchase"), HttpStatus.OK);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Sale>> getAllsale(){
        return ResponseEntity.ok(saleService.getAllSales());
    }
}
