package com.example.spring.security.postgresql.repository;

import com.example.spring.security.postgresql.models.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailRepository extends JpaRepository<Detail, Long> {
    List<Detail> findByProduct_Id(Long productId);
}
