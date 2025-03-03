package com.lunarest.logginResgister.sleepdata;

import com.lunarest.logginResgister.appuser.AppUser;
import com.lunarest.logginResgister.recommendation.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SleepDataService {

    private final SleepDataRepository sleepDataRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final RecommendationService recommendationService;

    @Autowired
    public SleepDataService(SleepDataRepository sleepDataRepository, RecommendationService recommendationService) {
        this.sleepDataRepository = sleepDataRepository;
        this.recommendationService = recommendationService;
    }

    // ✅ Check if the user already entered sleep data for today
    public Optional<SleepData> findSleepDataByDate(AppUser user, LocalDate date) {
        return sleepDataRepository.findByUser(user)
                .stream()
                .filter(data -> data.getDate() != null && data.getDate().equals(date))
                .findFirst();
    }

    // ✅ Add Sleep Data (Prevents duplicate entries)
    public void addSleepData(AppUser user, LocalDate date, String name, int age, String gender, int universityYear,
                             double weekdaysSleepDuration, double weekendsSleepDuration, double weekdaysStudyHours,
                             double weekendsStudyHours, double weekdaysScreenTime, double weekendsScreenTime,
                             int caffeineIntake, int physicalActivityLevel, LocalTime weekdaysSleepStart,
                             LocalTime weekdaysSleepEnd, LocalTime weekendsSleepStart, LocalTime weekendsSleepEnd) {

        // 🔴 Prevent duplicate entries for the same day
        if (findSleepDataByDate(user, date).isPresent()) {
            throw new IllegalStateException("Sleep data for today already exists.");
        }

        // Create a new sleep data entry
        SleepData sleepData = new SleepData(user, date, name, age, gender, universityYear,
                weekdaysSleepDuration, weekendsSleepDuration, weekdaysStudyHours, weekendsStudyHours,
                weekdaysScreenTime, weekendsScreenTime, caffeineIntake, physicalActivityLevel,
                weekdaysSleepStart, weekdaysSleepEnd, weekendsSleepStart, weekendsSleepEnd);

        sleepDataRepository.save(sleepData);

        // Call ML Model for Sleep Quality Prediction
        int predictedSleepQuality = getSleepQualityPrediction(sleepData);
        sleepData.setSleepQuality(predictedSleepQuality);

        //Call AI for Sleep Recommendations
        String recommendation = recommendationService.getSleepRecommendation(predictedSleepQuality,
                sleepData.getCaffeineIntake(), sleepData.getWeekdaysScreenTime(), sleepData.getWeekdaysStudyHours());

        sleepData.setRecommendation(recommendation);
        sleepDataRepository.save(sleepData);
    }

    // Call the ML Model for Sleep Quality Prediction (Fixed type issue)
    private int getSleepQualityPrediction(SleepData sleepData) {
        String mlModelUrl = "http://localhost:5000/predict"; // Your ML model API

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("weekdaysSleepDuration", sleepData.getWeekdaysSleepDuration());
        requestBody.put("weekendsSleepDuration", sleepData.getWeekendsSleepDuration());
        requestBody.put("weekdaysStudyHours", sleepData.getWeekdaysStudyHours());
        requestBody.put("weekendsStudyHours", sleepData.getWeekendsStudyHours());
        requestBody.put("weekdaysScreenTime", sleepData.getWeekdaysScreenTime());
        requestBody.put("weekendsScreenTime", sleepData.getWeekendsScreenTime());
        requestBody.put("caffeineIntake", sleepData.getCaffeineIntake());

        try {
            // ✅ Use `exchange()` for proper type inference
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    mlModelUrl, HttpMethod.POST, new HttpEntity<>(requestBody),
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            if (response.getBody() != null && response.getBody().containsKey("sleepQuality")) {
                return (int) response.getBody().get("sleepQuality");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return -1; // Default value in case of failure
    }

    // ✅ Fetch Sleep Data for User
    public List<SleepData> getSleepDataByUser(AppUser user) {
        return sleepDataRepository.findByUser(user);
    }

    // 📊 **1. Sleep Quality Trend Data for Chart**
    public List<Map<String, Object>> getSleepQualityTrends(AppUser user) {
        return sleepDataRepository.findByUser(user).stream()
                .filter(data -> data.getDate() != null)  // ✅ Ensure getDate() is not null
                .map(data -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("date", data.getDate().toString());
                    result.put("sleepQuality", (Integer) data.getSleepQuality());
                    return result;
                })
                .collect(Collectors.toList());
    }

    // 📊 **2. Sleep Habits Comparison Data for Chart**
    public List<Map<String, Object>> getSleepHabitsComparison(AppUser user) {
        return sleepDataRepository.findByUser(user).stream()
                .filter(data -> data.getDate() != null)  // ✅ Ensure no null dates
                .map(data -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("date", data.getDate().toString());
                    result.put("weekdaysSleep", (Double) data.getWeekdaysSleepDuration());
                    result.put("weekendsSleep", (Double) data.getWeekendsSleepDuration());
                    result.put("weekdaysStudyHours", (Double) data.getWeekdaysStudyHours());
                    result.put("weekendsStudyHours", (Double) data.getWeekendsStudyHours());
                    result.put("weekdaysScreenTime", (Double) data.getWeekdaysScreenTime());
                    result.put("weekendsScreenTime", (Double) data.getWeekendsScreenTime());
                    result.put("caffeineIntake", (Integer) data.getCaffeineIntake());
                    result.put("physicalActivityLevel", (Integer) data.getPhysicalActivityLevel());
                    return result;
                })
                .collect(Collectors.toList());
    }

    // 📌 **3. Overview Block Data**
    public Map<String, Double> getSummaryAnalytics(AppUser user) {
        List<SleepData> sleepRecords = sleepDataRepository.findByUser(user);

        return Map.of(
                "averageSleepQuality", sleepRecords.stream().mapToInt(SleepData::getSleepQuality).average().orElse(0.0),
                "averageWeekdaysSleep", sleepRecords.stream().mapToDouble(SleepData::getWeekdaysSleepDuration).average().orElse(0.0),
                "averageWeekendsSleep", sleepRecords.stream().mapToDouble(SleepData::getWeekendsSleepDuration).average().orElse(0.0),
                "averageWeekdaysScreenTime", sleepRecords.stream().mapToDouble(SleepData::getWeekdaysScreenTime).average().orElse(0.0),
                "averageWeekendsScreenTime", sleepRecords.stream().mapToDouble(SleepData::getWeekendsScreenTime).average().orElse(0.0),
                "averageCaffeineIntake", sleepRecords.stream().mapToInt(SleepData::getCaffeineIntake).average().orElse(0.0),
                "averagePhysicalActivityLevel", sleepRecords.stream().mapToInt(SleepData::getPhysicalActivityLevel).average().orElse(0.0)
        );
    }
}
