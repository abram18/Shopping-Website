package com.example.spring.security.postgresql.controllers;

import com.example.spring.security.postgresql.models.Message;
import com.example.spring.security.postgresql.models.Product;
import com.example.spring.security.postgresql.services.ProductService;
import com.example.spring.security.postgresql.services.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	ProductService ProductService;
	
	@Autowired
	DetailService DetailService;
	
	@GetMapping("/{product_id}")
    public ResponseEntity<Object> getProductById(@PathVariable("product_id")Long productId){
        Optional<Product> productOptional = ProductService.getProductById(productId);
        if (productOptional.isEmpty())
            return new ResponseEntity<>(new Message("Not Found"), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(productOptional.get());
    }
	
	@GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(ProductService.getAllProducts());
    }
	
	@GetMapping("/best")
    public ResponseEntity<List<Product>> getBestProducts(){
        return ResponseEntity.ok(ProductService.getBestPriceProducts());
    }
	
	@GetMapping("/related/{category}/{product_id}")
    public ResponseEntity<Object> getRelatedProduct(@PathVariable("category")String category, @PathVariable("product_id")Long productId){
        return ResponseEntity.ok(ProductService.getRelatedProducts(category,productId));
    }
	
	@PostMapping("/create")
	public ResponseEntity<Message> createProduct(@RequestBody Product product, BindingResult bindingResult){
	    if (bindingResult.hasErrors())
	        return ResponseEntity.badRequest().body(new Message("Please revise the fields"));
	    ProductService.saveProduct(product);
	    return ResponseEntity.ok(new Message("Created successfully"));
	}
	
	@PutMapping("/update")
	public ResponseEntity<Message> updateProduct(@RequestBody Product product, BindingResult bindingResult){
	    if (bindingResult.hasErrors())
	        return ResponseEntity.badRequest().body(new Message("Please revise the fields"));
	    ProductService.saveProduct(product);
	    return ResponseEntity.ok(new Message("Updated successfully"));
	}
	
	@DeleteMapping("/clean/{product_id}")
    public ResponseEntity<Message> removeProduct(@PathVariable("product_id")Long productId){
        ProductService.removeItem(productId);
        DetailService.removeItem(productId);
        return new ResponseEntity<>(new Message("Deleted"),HttpStatus.OK);
    }
    
}
