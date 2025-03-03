package com.lunarest.logginResgister;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(
    scanBasePackages = {
        "com.lunarest.logginResgister",
        "com.lunarest.logginResgister.appuser",
        "com.lunarest.logginResgister.registration",
        "com.lunarest.logginResgister.security",
        "com.lunarest.logginResgister.email",
        "com.lunarest.logginResgister.sleepdata"
    }
)
@EntityScan("com.lunarest.logginResgister")
@EnableJpaRepositories("com.lunarest.logginResgister")
public class LogginResgisterApplication {

    public static void main(String[] args) {
        SpringApplication.run(LogginResgisterApplication.class, args);
    }
} 