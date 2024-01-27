package com.example.spring.security.postgresql.services;

import com.example.spring.security.postgresql.models.Detail;
import com.example.spring.security.postgresql.models.Sale;
import com.example.spring.security.postgresql.models.ShoppingCart;
import com.example.spring.security.postgresql.repository.SaleRepository;
import com.example.spring.security.postgresql.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
@Transactional
public class SaleService {

    private final SaleRepository saleRepository;
    private final UserService userService;
    private final ShoppingCartService shoppingCartService;
    private final DetailService detailService;
    @Autowired
    public SaleService(SaleRepository saleRepository, UserService userService, ShoppingCartService shoppingCartService,
                       DetailService detailService) {
        this.saleRepository = saleRepository;
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
        this.detailService = detailService;
    }

    public List<Sale> getSalesByClient(String username){
        return this.saleRepository.findByClient_Username(username);
    }
    
    public List<Sale> getAllSales(){
        return this.saleRepository.findAll();
   }
    
    public void createsale(String username){
        User client = this.userService.getByUserName(username).get();
        List<ShoppingCart> shoppingCartList = this.shoppingCartService.getListByClient(client.getUsername());
        DecimalFormat decimalFormat = new DecimalFormat("0.00", new DecimalFormatSymbols(Locale.US));
        decimalFormat.setRoundingMode(RoundingMode.DOWN);
        double total = shoppingCartList.stream().mapToDouble(shoppingCartItem -> shoppingCartItem.getProduct().getPrice()
                * shoppingCartItem.getAmount()).sum();
        Sale sale = new Sale(Double.parseDouble(decimalFormat.format(total)), new Date(), client);
        Sale saveSale = this.saleRepository.save(sale);
        for (ShoppingCart shoppingCart : shoppingCartList) {
            Detail detail = new Detail();
            detail.setProduct(shoppingCart.getProduct());
            detail.setAmount(shoppingCart.getAmount());
            detail.setSale(saveSale);
            this.detailService.createDetail(detail);
        }
        this.shoppingCartService.cleanShoppingCart(client.getId());
    }
}
