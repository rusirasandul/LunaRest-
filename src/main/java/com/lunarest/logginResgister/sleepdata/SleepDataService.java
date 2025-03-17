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

    // Add Sleep Data (Prevents duplicate entries)
    public void addSleepData(AppUser user, LocalDate date, String name, int age, String gender, int universityYear,
                             double weekdaysSleepDuration, double weekendsSleepDuration, double weekdaysStudyHours,
                             double weekendsStudyHours, double weekdaysScreenTime, double weekendsScreenTime,
                             int caffeineIntake, int physicalActivityLevel, LocalTime weekdaysSleepStart,
                             LocalTime weekdaysSleepEnd, LocalTime weekendsSleepStart, LocalTime weekendsSleepEnd) {

        // Prevent duplicate entries for the same day
        Optional<SleepData> existingData = sleepDataRepository.findByUserAndDate(user, date);
        if (existingData.isPresent()) {
            throw new IllegalStateException("Sleep data for today already exists.");
        }

        // Calculate averages for sleep duration, study hours, and screen time
        double averageSleepDuration = (weekdaysSleepDuration + weekendsSleepDuration) / 2;
        double averageStudyHours = (weekdaysStudyHours + weekendsStudyHours) / 2;
        double averageScreenTime = (weekdaysScreenTime + weekendsScreenTime) / 2;

        // Create a new sleep data entry
        SleepData sleepData = new SleepData(user, date, name, age, gender, universityYear,
                averageSleepDuration, averageSleepDuration, averageStudyHours, averageStudyHours,
                averageScreenTime, averageScreenTime, caffeineIntake, physicalActivityLevel,
                weekdaysSleepStart, weekdaysSleepEnd, weekendsSleepStart, weekendsSleepEnd);

        sleepDataRepository.save(sleepData);

        // Call ML Model for Sleep Quality Prediction
        int predictedSleepQuality = getSleepQualityPrediction(sleepData);
        sleepData.setSleepQuality(predictedSleepQuality);

        // Call AI for Sleep Recommendations
        String recommendation = recommendationService.getSleepRecommendation(predictedSleepQuality,
                sleepData.getCaffeineIntake(), sleepData.getWeekdaysScreenTime(), sleepData.getWeekdaysStudyHours());

        sleepData.setRecommendation(recommendation);
        sleepDataRepository.save(sleepData);
    }

    // Fetch Sleep Data for User
    public List<SleepData> getSleepDataByUser(AppUser user) {
        return sleepDataRepository.findByUser(user);
    }

    // Sleep Habits Comparison Data for Five Separate Charts
    public Map<String, List<Map<String, Object>>> getSleepHabitsComparison(AppUser user) {
        List<SleepData> sleepRecords = sleepDataRepository.findByUser(user);

        Map<String, List<Map<String, Object>>> comparisonData = new HashMap<>();

        // Average Sleep Duration (Weekdays + Weekends) / 2
        comparisonData.put("sleepDuration", sleepRecords.stream()
                .filter(data -> data.getDate() != null)
                .map(data -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("date", data.getDate().toString());
                    result.put("averageSleepDuration", (data.getWeekdaysSleepDuration() + data.getWeekendsSleepDuration()) / 2);
                    return result;
                })
                .collect(Collectors.toList()));

        // Average Study Hours (Weekdays + Weekends) / 2
        comparisonData.put("studyHours", sleepRecords.stream()
                .filter(data -> data.getDate() != null)
                .map(data -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("date", data.getDate().toString());
                    result.put("averageStudyHours", (data.getWeekdaysStudyHours() + data.getWeekendsStudyHours()) / 2);
                    return result;
                })
                .collect(Collectors.toList()));

        // Average Screen Time (Weekdays + Weekends) / 2
        comparisonData.put("screenTime", sleepRecords.stream()
                .filter(data -> data.getDate() != null)
                .map(data -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("date", data.getDate().toString());
                    result.put("averageScreenTime", (data.getWeekdaysScreenTime() + data.getWeekendsScreenTime()) / 2);
                    return result;
                })
                .collect(Collectors.toList()));

        // Average Caffeine Intake
        comparisonData.put("caffeineIntake", sleepRecords.stream()
                .filter(data -> data.getDate() != null)
                .map(data -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("date", data.getDate().toString());
                    result.put("averageCaffeineIntake", data.getCaffeineIntake());
                    return result;
                })
                .collect(Collectors.toList()));

        // Average Physical Activity Level
        comparisonData.put("physicalActivityLevel", sleepRecords.stream()
                .filter(data -> data.getDate() != null)
                .map(data -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("date", data.getDate().toString());
                    result.put("averagePhysicalActivityLevel", data.getPhysicalActivityLevel());
                    return result;
                })
                .collect(Collectors.toList()));

        return comparisonData;
    }

    // Call the ML Model for Sleep Quality Prediction
    private int getSleepQualityPrediction(SleepData sleepData) {
        String mlModelUrl = "http://localhost:5000/predict";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("weekdaysSleepDuration", sleepData.getWeekdaysSleepDuration());
        requestBody.put("weekendsSleepDuration", sleepData.getWeekendsSleepDuration());
        requestBody.put("weekdaysStudyHours", sleepData.getWeekdaysStudyHours());
        requestBody.put("weekendsStudyHours", sleepData.getWeekendsStudyHours());
        requestBody.put("weekdaysScreenTime", sleepData.getWeekdaysScreenTime());
        requestBody.put("weekendsScreenTime", sleepData.getWeekendsScreenTime());
        requestBody.put("caffeineIntake", sleepData.getCaffeineIntake());

        try {
            // Use `exchange()` for proper type inference
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

    // Overview Block Data
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

    // New method to handle requests from frontend
    public SleepData addSleepDataFromRequest(AppUser user, SleepDataRequest request) {
        // Prevent duplicate entries for the same day
        LocalDate today = LocalDate.now();
        Optional<SleepData> existingData = sleepDataRepository.findByUserAndDate(user, today);
        if (existingData.isPresent()) {
            throw new IllegalStateException("Sleep data for today already exists.");
        }

        // Parse time strings to LocalTime
        LocalTime weekdaysSleepStart = LocalTime.parse(request.getWeekdaysSleepStart());
        LocalTime weekdaysSleepEnd = LocalTime.parse(request.getWeekdaysSleepEnd());
        LocalTime weekendsSleepStart = LocalTime.parse(request.getWeekendsSleepStart());
        LocalTime weekendsSleepEnd = LocalTime.parse(request.getWeekendsSleepEnd());

        // Create a new sleep data entry
        SleepData sleepData = new SleepData(
                user, today, request.getName(), request.getAge(), request.getGender(), request.getUniversityYear(),
                request.getWeekdaysSleepDuration(), request.getWeekendsSleepDuration(),
                request.getWeekdaysStudyHours(), request.getWeekendsStudyHours(),
                request.getWeekdaysScreenTime(), request.getWeekendsScreenTime(),
                request.getCaffeineIntake(), request.getPhysicalActivityLevel(),
                weekdaysSleepStart, weekdaysSleepEnd, weekendsSleepStart, weekendsSleepEnd
        );

        sleepDataRepository.save(sleepData);

        // Call ML Model for Sleep Quality Prediction
        int predictedSleepQuality = getSleepQualityPrediction(sleepData);
        sleepData.setSleepQuality(predictedSleepQuality);

        // Generate recommendation based on sleep data
        String recommendation = recommendationService.generateRecommendation(sleepData);
        sleepData.setRecommendation(recommendation);

        // Save updated sleep data with prediction and recommendation
        return sleepDataRepository.save(sleepData);
    }
}
