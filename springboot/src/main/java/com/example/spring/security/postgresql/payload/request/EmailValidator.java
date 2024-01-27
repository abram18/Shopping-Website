package com.example.spring.security.postgresql.payload.request;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {

    private final String EMAIL_PATTERN = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";

    @Override
    public boolean test(String email) {
        return email.matches(EMAIL_PATTERN);
    }
}