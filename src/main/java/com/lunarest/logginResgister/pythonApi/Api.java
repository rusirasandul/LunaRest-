package com.lunarest.logginResgister.pythonApi;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class Api {

    private final String PYTHON_API_URL = "http://localhost:5000/process-sleep-score";

    public String processSleepScore(List<Map<String, Object>> sleepData) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<List<Map<String, Object>>> requestEntity = new HttpEntity<>(sleepData, headers);

        ResponseEntity<String> response = restTemplate.exchange(PYTHON_API_URL, HttpMethod.POST, requestEntity, String.class);

        return response.getBody();
    }
}
