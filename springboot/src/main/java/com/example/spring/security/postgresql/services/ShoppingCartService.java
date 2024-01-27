package com.example.spring.security.postgresql.services;

import com.example.spring.security.postgresql.models.ShoppingCart;
import com.example.spring.security.postgresql.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    @Autowired
    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
    }
    public List<ShoppingCart> getListByClient(String username){
        return this.shoppingCartRepository.findByClient_Username(username);
    }
    public void cleanShoppingCart(Long clientId){
        this.shoppingCartRepository.deleteByClient_Id(clientId);
    }
    public void removeProduct(Long id){
        this.shoppingCartRepository.deleteById(id);
    }
    public void addProduct(ShoppingCart shoppingCart){
        this.shoppingCartRepository.save(shoppingCart);
    }
    public Long getCountByClient(Long clientId){
        return this.shoppingCartRepository.countByClient_Id(clientId);
    }
}
