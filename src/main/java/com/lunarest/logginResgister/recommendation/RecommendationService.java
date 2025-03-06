package com.lunarest.logginResgister.recommendation;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class RecommendationService {

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String OPENAI_API_KEY = "your_openai_api_key"; // Replace with your OpenAI API key

    public String getSleepRecommendation(int sleepQuality, int caffeineIntake, double screenTime, double studyHours) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(OPENAI_API_KEY);

        // ChatGPT prompt
        String prompt = String.format("My sleep quality is %d out of 10. " +
                        "I consume %d caffeine drinks daily, my screen time is %.2f hours, and I study for %.2f hours daily. " +
                        "Give me personalized sleep improvement tips.",
                sleepQuality, caffeineIntake, screenTime, studyHours);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", new Object[]{
                Map.of("role", "system", "content", "You are a sleep expert providing actionable recommendations."),
                Map.of("role", "user", "content", prompt)
        });
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_API_URL, request, Map.class);
            if (response.getBody() != null) {
                Map<String, Object> choices = (Map<String, Object>) ((java.util.List<?>) response.getBody().get("choices")).get(0);
                Map<String, Object> message = (Map<String, Object>) choices.get("message");
                return (String) message.get("content");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "No recommendation available at the moment.";
    }
}

