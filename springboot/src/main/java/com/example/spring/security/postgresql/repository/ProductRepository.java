package com.example.spring.security.postgresql.repository;

import com.example.spring.security.postgresql.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCategoryAndIdNot(String category, Long ProductId);
    List<Product> findFirst4ByOrderByPriceAsc();
}
