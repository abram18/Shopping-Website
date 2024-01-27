package com.example.spring.security.postgresql.repository;

import com.example.spring.security.postgresql.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale,String> {
    List<Sale> findByClient_Username(String username);
}
