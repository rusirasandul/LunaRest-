package com.lunarest.logginResgister.registration;

public class EmailAlreadyConfirmedException extends RuntimeException {
    public EmailAlreadyConfirmedException(String message) {
        super(message);
    }
}
