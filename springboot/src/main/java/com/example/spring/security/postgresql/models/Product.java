package com.example.spring.security.postgresql.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
//import org.hibernate.annotations.GenericGenerator;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//
//import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

//@Entity
//
//import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    @Column(name = "id")
	@JsonProperty("id")
    Long id;
    @NotBlank @NotNull
    @Getter @Setter
    @Column(name = "name")
	@JsonProperty("name")
    String name;
    @NotNull @DecimalMin(value = "0.1")
    @Getter @Setter
    @Column(name = "price")
	@JsonProperty("price")
    Double price;
    @NotBlank @NotNull
    @Getter @Setter
    @Column(name = "description")
	@JsonProperty("description")
     String description;
    @NotBlank @NotNull
    @Getter @Setter
    @Column(name = "category")
	@JsonProperty("category")
     String category;
    @NotBlank @NotNull
    @Getter @Setter
    @Column(name = "image")
	@JsonProperty("image")
     String image;
    
}
