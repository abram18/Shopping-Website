package com.example.spring.security.postgresql.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

//import com.example.spring.security.postgresql.models.Product;
//import com.example.spring.security.postgresql.models.Sale;

//import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;
    @ManyToOne(optional = false, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Sale sale;
    @NotNull
    private int amount;
    
    public Detail() {
		
	}
    
    public Long getId() {
		return id;
	}
    
    public void setId(Long id) {
		this.id = id;
	}


	public void setAmount(int amount) {
		this.amount = amount;
		
	}
	
	public int getAmount() {
		return amount;
		
	}

	public void setSale(Sale sale) {
		this.sale = sale;
		
	}
	
	public Sale getSale() {
		return sale;
		
	}
	
	public void setProduct(Product product) {
		this.product = product;
		
	}
	
	public Product getProduct() {
		return product;
		
	}
    

}
