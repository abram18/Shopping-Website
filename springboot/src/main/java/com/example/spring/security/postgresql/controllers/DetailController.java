package com.example.spring.security.postgresql.controllers;

import com.example.spring.security.postgresql.models.Detail;
import com.example.spring.security.postgresql.services.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/saleDetail")
public class DetailController {

    private final DetailService detailService;

    @Autowired
    public DetailController(DetailService detailService) {
        this.detailService = detailService;
    }
    @GetMapping("/{product_id}")
    public ResponseEntity<List<Detail>> getDetailsByProduct(@PathVariable("product_id")Long productid){
        return new ResponseEntity<>(this.detailService.getDetailByProduct(productid), HttpStatus.OK);
    }
}
