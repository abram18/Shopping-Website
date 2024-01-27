package com.example.spring.security.postgresql.services;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring.security.postgresql.models.ConfirmationToken;
//import com.example.spring.security.postgresql.payload.request.EmailValidator;
//import com.example.spring.security.postgresql.repository.EmailSender;
import com.example.spring.security.postgresql.security.services.ConfirmationTokenService;
import com.example.spring.security.postgresql.security.services.UserDetailsServiceImpl;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class RegistrationService {
	
	private final UserDetailsServiceImpl appUserService;
    private final ConfirmationTokenService confirmTokenService;



    public RegistrationService(UserDetailsServiceImpl appUserService, ConfirmationTokenService confirmTokenService) {
        this.appUserService = appUserService;
        this.confirmTokenService = confirmTokenService;
    }
	
	 @Transactional
	    public String confirmToken(String token) {
	        Optional<ConfirmationToken> confirmToken = confirmTokenService.getToken(token);

	        if (confirmToken.isEmpty()) {
	            throw new IllegalStateException("Token not found!");
	        }

	        if (confirmToken.get().getConfirmedAt() != null) {
	            throw new IllegalStateException("Email is already confirmed");
	        }

	        LocalDateTime expiresAt = confirmToken.get().getExpiresAt();

	        if (expiresAt.isBefore(LocalDateTime.now())) {
	            throw new IllegalStateException("Token is already expired!");
	        }

	        confirmTokenService.setConfirmedAt(token);
	        appUserService.enableAppUser(confirmToken.get().getAppUser().getEmail());

	        //Returning confirmation message if the token matches
	        return "Your email is confirmed. Thank you for using our service!";
	    }
}