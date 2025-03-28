package com.lunarest.logginResgister.appuser;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class AppUser implements UserDetails {

    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private  Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    private String profileImage; // New field for profile image URL
    private String firstName;
    private String lastName;

    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    private Boolean locked;
    private Boolean enabled;

    //constructor
    public AppUser(String name,
                   String username,
                   String email,
                   String password,
                   AppUserRole appUserRole
                   ) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
        this.profileImage = "/api/placeholder/150/150"; // Default profile image
       
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
