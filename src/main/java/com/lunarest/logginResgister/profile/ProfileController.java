package com.lunarest.logginResgister.profile;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileDTO> getUserProfile() {
        ProfileDTO profile = profileService.getCurrentUserProfile();
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileUpdateRequest request) {
        ProfileDTO updatedProfile = profileService.updateProfile(request);
        return ResponseEntity.ok(updatedProfile);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file) {
        try {
            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);

            // Save file
            Files.copy(file.getInputStream(), filePath);

            // Update user profile with new image URL
            ProfileUpdateRequest request = new ProfileUpdateRequest();
            request.setProfileImage("/uploads/" + filename);
            profileService.updateProfile(request);

            return ResponseEntity.ok("/uploads/" + filename);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to upload image: " + e.getMessage());
        }
    }
}
