package com.example.spring.security.postgresql.repository;

import com.example.spring.security.postgresql.models.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    List<ShoppingCart> findByClient_Id(Long clientId);
    List<ShoppingCart> findByClient_Username(String clientEmail);
    void deleteByClient_Id(Long clientId);
    Long countByClient_Id(Long id);
}
