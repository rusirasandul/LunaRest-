package com.lunarest.logginResgister.FitController;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.fitness.Fitness;
import com.google.api.services.fitness.FitnessScopes;
import com.google.api.services.fitness.model.DataPoint;
import com.google.api.services.fitness.model.DataSet;
import com.google.api.services.fitness.model.ListSessionResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.fitness.Fitness;


@RestController
public class FitController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    private final OAuth2AuthorizedClientService authorizedClientService;

    public FitController(OAuth2AuthorizedClientService authorizedClientService) {
        this.authorizedClientService = authorizedClientService;
    }

    @GetMapping("/fit/data")
    public String getFitData(OAuth2AuthenticationToken authentication) throws IOException, GeneralSecurityException {
        String accessToken = authorizedClientService
                .loadAuthorizedClient(
                        authentication.getAuthorizedClientRegistrationId(),
                        authentication.getName())
                .getAccessToken().getTokenValue();

        Fitness fitnessService = createFitnessService(accessToken);

        // Example: List sessions
        ListSessionResponse sessions = fitnessService.users().sessions()
                .list("me")
                .execute();

        return "Google Fit Sessions: " + sessions.toString(); //Print info to see results
        // Implement code to read session/activity data from Google Fit
    }

    private Fitness createFitnessService(String accessToken) throws IOException, GeneralSecurityException {
        final JacksonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
        final com.google.api.client.http.HttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);
        return new Fitness.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName("LunaRest") //Set your App Name
                .build();
    }

}

