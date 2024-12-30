package com.lunarest.logginResgister.registration;

import com.lunarest.logginResgister.appuser.AppUser;
import com.lunarest.logginResgister.appuser.AppUserRole;
import com.lunarest.logginResgister.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private EmailValidater emailValidater;

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidater.test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("Invalid email");
        }

        return appUserService.signUpUser(
                new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        AppUserRole.USER
                )
        );
    }

    public String confirmToken(String token) {
        return null;
    }
}
