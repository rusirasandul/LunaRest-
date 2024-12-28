package com.lunarest.logginResgister.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
public class RegistrationController {

    private final RegistrationService registrationService ;

    // Manually created constructor for dependency injection
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }


    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }


}