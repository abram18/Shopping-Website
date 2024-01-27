package com.example.spring.security.postgresql.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.spring.security.postgresql.models.ERole;
import com.example.spring.security.postgresql.models.Role;
import com.example.spring.security.postgresql.models.User;
import com.example.spring.security.postgresql.payload.request.EmailValidator;
import com.example.spring.security.postgresql.payload.request.LoginRequest;
import com.example.spring.security.postgresql.payload.request.SignupRequest;
import com.example.spring.security.postgresql.payload.response.JwtResponse;
import com.example.spring.security.postgresql.payload.response.MessageResponse;
import com.example.spring.security.postgresql.repository.EmailSender;
import com.example.spring.security.postgresql.repository.RoleRepository;
import com.example.spring.security.postgresql.repository.UserRepository;
import com.example.spring.security.postgresql.security.jwt.JwtUtils;
import com.example.spring.security.postgresql.security.services.UserDetailsImpl;
import com.example.spring.security.postgresql.security.services.UserDetailsServiceImpl;
import com.example.spring.security.postgresql.services.RegistrationService;
import com.example.spring.security.postgresql.services.UserService;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final UserService userService;
  private final PasswordEncoder encoder;
  private final JwtUtils jwtUtils;
  private final RegistrationService registrationService;
  private final EmailSender emailSender;
  private final EmailValidator emailValidator;
  private final UserDetailsServiceImpl appUserService;
   
  @Autowired
  public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
      RoleRepository roleRepository, UserService userService, PasswordEncoder encoder, JwtUtils jwtUtils,
      RegistrationService registrationService, EmailValidator emailValidator, EmailSender emailSender,
      UserDetailsServiceImpl appUserService) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.userService = userService;
    this.encoder = encoder;
    this.jwtUtils = jwtUtils;
    this.registrationService = registrationService;
    this.emailValidator = emailValidator;
    this.emailSender = emailSender;
    this.appUserService = appUserService;
  }

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    if (userDetails.getEnabled() == true) {
      List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
          .collect(Collectors.toList());

      return ResponseEntity
          .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    } else {
      throw new IllegalStateException(String.format("Email %s, not verified", loginRequest.getUsername()));
    }

  }

  @PostMapping("/register")
  public String registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
    	throw new IllegalStateException(String.format("Username %s, is already taken!", signUpRequest.getUsername()));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      throw new IllegalStateException(String.format("Username %s, is already in use!", signUpRequest.getEmail()));
    }

    boolean isValidEmail = emailValidator.test(signUpRequest.getEmail());

    if (isValidEmail) {
      // Create new user's account
      User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
          encoder.encode(signUpRequest.getPassword()));

      Set<String> strRoles = signUpRequest.getRole();
      Set<Role> roles = new HashSet<>();

      if (strRoles == null) {
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
      } else {
        strRoles.forEach(role -> {
          switch (role) {
            case "admin":
              Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(adminRole);

              break;
            default:
              Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(userRole);
          }
        });
      }

      user.setRoles(roles);
      String tokenForNewUser = appUserService.signUpUser(user);
      // userRepository.save(user);

      String link = "http://localhost:8080/auth/confirm?token=" + tokenForNewUser;
      emailSender.sendEmail(signUpRequest.getEmail(), buildEmail(signUpRequest.getUsername(), link, tokenForNewUser));
      return tokenForNewUser;
    } else {
      throw new IllegalStateException(String.format("Email %s, not valid", signUpRequest.getEmail()));
    }

    // return ResponseEntity.ok(new MessageResponse("User registered
    // successfully!"));
  }
  
  private String buildEmail(String name, String link, String tokenForNewUser) {
	    return "<div style=\"font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f5f5f5; padding: 20px;\">\n" +
	            "    <div style=\"max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 5px; box-shadow: 0px 2px 5px rgba(0,0,0,0.1);\">\n" +
	            "        <h1 style=\"font-family: Helvetica, Arial, sans-serif; font-size: 24px; color: #333; margin-top: 0;\">Confirm your email</h1>\n" +
	            "        <p style=\"margin-bottom: 30px;\">Hi " + name + ",</p>\n" +
	            "        <p style=\"margin-bottom: 30px;\">Thank you for registering. Please click on the below link to activate your account:</p>\n" +
	            "        <p style=\"margin-bottom: 30px;\"><a href=\"" + link + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 3px;\">Activate Now</a></p>\n" +
	            "        <blockquote style=\"margin: 0 0 30px 0; border-left: 2px solid #007bff; padding-left: 10px; color: #555; font-style: italic;\">\n" +
	            "            <p style=\"margin-bottom: 0;\"> Or input this verification code: " + tokenForNewUser + "</p>\n" +
	            "        </blockquote>\n" +
	            "        <p style=\"margin-bottom: 0;\">The link will expire in 15 minutes.</p>\n" +
	            "        <p style=\"margin-bottom: 0;\">See you soon!</p>\n" +
	            "    </div>\n" +
	            "</div>";
	}


  @GetMapping(path = "confirm")
  public String confirm(@RequestParam("token") String token) {
    return registrationService.confirmToken(token);
  }

  @GetMapping("/details")
  public ResponseEntity<?> getUserDetails() {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
        .getPrincipal();
    String username = userDetails.getUsername();
    Optional<User> user = this.userService.getByUserName(username);
    if (!user.isPresent())
      return new ResponseEntity<>(new MessageResponse("Error: Not Found"), HttpStatus.NOT_FOUND);
    return ResponseEntity.ok(user.get());
  }

  @GetMapping("/logout")
  public ResponseEntity<MessageResponse> logOut(HttpServletResponse httpServletResponse) {
    return ResponseEntity.ok(new MessageResponse("Error: Session Closed"));
  }
}
