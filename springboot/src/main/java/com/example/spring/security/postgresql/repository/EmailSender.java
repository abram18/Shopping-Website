package com.example.spring.security.postgresql.repository;

public interface EmailSender {

    void sendEmail(String to, String email);
}