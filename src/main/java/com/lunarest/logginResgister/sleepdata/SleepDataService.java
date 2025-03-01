package com.lunarest.logginResgister.sleepdata;

import com.lunarest.logginResgister.appuser.AppUser;
import com.lunarest.logginResgister.recommendation.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public void addSleepData(AppUser user, LocalDate date, String name, int age, String gender, int universityYear,
                             double weekdaysSleepDuration, double weekendsSleepDuration, double weekdaysStudyHours,
                             double weekendsStudyHours, double weekdaysScreenTime, double weekendsScreenTime,
                             int caffeineIntake, int physicalActivityLevel, LocalTime weekdaysSleepStart,
                             LocalTime weekdaysSleepEnd,
                             LocalTime weekendsSleepStart, LocalTime weekendsSleepEnd ) {

        SleepData sleepData = new SleepData(user, date, name, age, gender, universityYear,
                weekdaysSleepDuration, weekendsSleepDuration, weekdaysStudyHours, weekendsStudyHours,
                weekdaysScreenTime, weekendsScreenTime, caffeineIntake, physicalActivityLevel
                ,weekdaysSleepStart, weekdaysSleepEnd, weekendsSleepStart, weekendsSleepEnd);

        sleepDataRepository.save(sleepData);

        // **Call ML Model for Sleep Quality Prediction**
        int predictedSleepQuality = getSleepQualityPrediction(sleepData);
        sleepData.setSleepQuality(predictedSleepQuality);

        // **Call ChatGPT API for Recommendations**
        String recommendation = recommendationService.getSleepRecommendation(predictedSleepQuality,
                sleepData.getCaffeineIntake(), sleepData.getWeekdaysScreenTime(), sleepData.getWeekdaysStudyHours());

        sleepData.setRecommendation(recommendation);
        sleepDataRepository.save(sleepData);
    }

    private int getSleepQualityPrediction(SleepData sleepData) {
        String mlModelUrl = "http://localhost:5000/predict"; // Python ML model API URL

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("weekdaysSleepDuration", sleepData.getWeekdaysSleepDuration());
        requestBody.put("weekendsSleepDuration", sleepData.getWeekendsSleepDuration());
        requestBody.put("weekdaysStudyHours", sleepData.getWeekdaysStudyHours());
        requestBody.put("weekendsStudyHours", sleepData.getWeekendsStudyHours());
        requestBody.put("weekdaysScreenTime", sleepData.getWeekdaysScreenTime());
        requestBody.put("weekendsScreenTime", sleepData.getWeekendsScreenTime());
        requestBody.put("caffeineIntake", sleepData.getCaffeineIntake());

        try {
            Map response = restTemplate.postForObject(mlModelUrl, requestBody, Map.class);
            if (response != null && response.containsKey("sleepQuality")) {
                return (int) response.get("sleepQuality");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return -1; // Default value in case of failure
    }

    public List<SleepData> getSleepDataByUser(AppUser user) {
        return sleepDataRepository.findByUser(user);
    }
}
