package com.lunarest.logginResgister.appuser;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional()
public interface AppUserRepository {


    Optional<AppUser> findByEmail(String email);
}
