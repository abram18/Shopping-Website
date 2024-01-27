package com.example.spring.security.postgresql.security.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring.security.postgresql.models.ConfirmationToken;
import com.example.spring.security.postgresql.models.User;
import com.example.spring.security.postgresql.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserRepository userRepository;
  //private final PasswordEncoder passwordEncoder;
  private final ConfirmationTokenService confirmationTokenService;

  @Autowired
  public UserDetailsServiceImpl(UserRepository userRepository, ConfirmationTokenService confirmationTokenService) {
      this.userRepository = userRepository;
      //this.passwordEncoder = passwordEncoder;
      this.confirmationTokenService = confirmationTokenService;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

    return UserDetailsImpl.build(user);
  }
  
  public String signUpUser(User appUser) {
      boolean userExists = userRepository.findByEmail(appUser.getEmail()).isPresent();

      if (userExists) {

          User appUserPrevious =  userRepository.findByEmail(appUser.getEmail()).get();
          Boolean isEnabled = appUserPrevious.getEnabled();

          if (!isEnabled) {
              String token = UUID.randomUUID().toString();

              //A method to save user and token in this class
              saveConfirmationToken(appUserPrevious, token);

              return token;

          }
          throw new IllegalStateException(String.format("User with email %s already exists!", appUser.getEmail()));
      }


      //Saving the user after encoding the password
      userRepository.save(appUser);

      //Creating a token from UUID
      String token = UUID.randomUUID().toString();

      //Getting the confirmation token and then saving it
      saveConfirmationToken(appUser, token);


      //Returning token
      return token;
  }
  

  private void saveConfirmationToken(User appUser, String token) {
      ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(),
              LocalDateTime.now().plusMinutes(15), appUser);
      confirmationTokenService.saveConfirmationToken(confirmationToken);
  }

  public int enableAppUser(String email) {
      return userRepository.enableAppUser(email);

  }

}
