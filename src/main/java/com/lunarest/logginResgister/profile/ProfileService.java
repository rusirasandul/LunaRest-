package com.lunarest.logginResgister.profile;

import com.lunarest.logginResgister.appuser.AppUser;
import com.lunarest.logginResgister.appuser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ProfileService {

    private final AppUserRepository appUserRepository;

    public ProfileDTO getCurrentUserProfile() {
        AppUser user = getCurrentUser();
        return mapToProfileDTO(user);
    }

    public ProfileDTO updateProfile(ProfileUpdateRequest request) {
        AppUser user = getCurrentUser();

        // Update user fields if provided
        if (request.getUsername() != null && !request.getUsername().isEmpty()) {
            user.setUsername(request.getUsername());
        }

        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            user.setEmail(request.getEmail());
        }

        if (request.getProfileImage() != null && !request.getProfileImage().isEmpty()) {
            user.setProfileImage(request.getProfileImage());
        }

        appUserRepository.save(user);
        return mapToProfileDTO(user);
    }

    private AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Assuming the authentication principal contains the email
        // If your authentication stores username instead, you'll need to adapt this
        String email = authentication.getName();

        // Using findByEmail instead of findByUsername
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    private ProfileDTO mapToProfileDTO(AppUser user) {
        return new ProfileDTO(
                user.getUsername(),
                user.getEmail(),
                user.getProfileImage()
        );
    }
}