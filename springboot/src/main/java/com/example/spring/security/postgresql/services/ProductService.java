package com.example.spring.security.postgresql.services;

import com.example.spring.security.postgresql.models.Product;
import com.example.spring.security.postgresql.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getRelatedProducts(String category, Long productId) {
        List<Product> productList = productRepository.findByCategoryAndIdNot(category, productId);
        List<Product> randomProducts = new ArrayList<>();

//        int listCount = productList.size();
        Random random = new Random();
        if (productList.size() > 1) {
        for (int i = 0; i < 2; i++) {
            int randomIndex = random.nextInt(productList.size());
            randomProducts.add(productList.get(randomIndex));
            productList.remove(randomIndex);
        }} else if (productList.size() == 1) {
        	randomProducts.add(productList.get(0));
            productList.remove(0);
        }
        return randomProducts;
    }

    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getBestPriceProducts() {
        return productRepository.findFirst4ByOrderByPriceAsc();
    }

    public void removeItem(Long id) {
        this.productRepository.deleteById(id);
    }
}
