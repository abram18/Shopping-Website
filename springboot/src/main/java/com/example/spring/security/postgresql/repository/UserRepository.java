package com.example.spring.security.postgresql.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring.security.postgresql.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
  
  @Transactional
  @Modifying
  @Query("UPDATE User a SET a.enabled=true WHERE a.email=?1")
  int enableAppUser(String email);

  Boolean existsByUsername(String usernme);

  Boolean existsByEmail(String email);
}
