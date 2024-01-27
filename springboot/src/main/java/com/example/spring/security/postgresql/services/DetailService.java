package com.example.spring.security.postgresql.services;

import com.example.spring.security.postgresql.models.Detail;
import com.example.spring.security.postgresql.repository.DetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DetailService {

    private final DetailRepository detailRepository;

    @Autowired
    public DetailService(DetailRepository detailRepository) {
        this.detailRepository = detailRepository;
    }
    public void createDetail(Detail detail){
        this.detailRepository.save(detail);
    }
    public List<Detail> getDetailByProduct(Long productId){
        return this.detailRepository.findByProduct_Id(productId);
    }
    
    public void removeItem(Long id){
    	this.detailRepository.deleteById(id);
    }
}
