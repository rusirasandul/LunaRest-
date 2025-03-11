package com.lunarest.logginResgister.security.ApiSecurity;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/oauth2/**", "/login/**").permitAll()  // Allow unauthenticated access to OAuth endpoints
                        .anyRequest().authenticated() // Require authentication for all other requests
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")  // Optional: Custom login page
                        .defaultSuccessUrl("/fit/data") //Redirect to Google Fit data endpoint after successful login
                        .failureUrl("/login?error") // Optional: custom error handling
                );
        // Add logout configuration if needed
        return http.build();

    }
}
