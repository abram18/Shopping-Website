package com.example.spring.security.postgresql.services;

import java.util.Optional;

import jakarta.transaction.Transactional;

import com.example.spring.security.postgresql.models.User;
import com.example.spring.security.postgresql.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {
	
	@Autowired
    UserRepository userRepository;

    
    public Optional<User> getByUserName(String username){
        return userRepository.findByUsername(username);
    }
    public boolean existByUserName(String username){
        return userRepository.existsByUsername(username);
    }
    public void save(User user){
        userRepository.save(user);
    }

}
