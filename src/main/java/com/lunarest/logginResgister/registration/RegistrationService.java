package com.lunarest.logginResgister.registration;

import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    public String register(RegistrationRequest request) {
        return "Works, Succesfully! ";
    }

    public String confirmToken(String token) {
        return null;
    }
}
