package com.lunarest.logginResgister.sleepdata;

import com.lunarest.logginResgister.appuser.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class SleepData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    private LocalDate date;
    private String name;
    private String dateOfBirth;
    private String gender;
    private int universityYear;
    private double weekdaysSleepDuration;
    private double weekendsSleepDuration;
    private double weekdaysStudyHours;
    private double weekendsStudyHours;
    private double weekdaysScreenTime;
    private double weekendsScreenTime;
    private int caffeineIntake;
    private String physicalActivityLevel;
    private int sleepQuality; // This will be populated by the ML model
    private String recommendation; // ChatGPT-generated recommendation

    public SleepData(AppUser user, LocalDate date, String name, String dateOfBirth, String gender, int universityYear,
                     double weekdaysSleepDuration, double weekendsSleepDuration, double weekdaysStudyHours,
                     double weekendsStudyHours, double weekdaysScreenTime, double weekendsScreenTime,
                     int caffeineIntake, String physicalActivityLevel) {
        this.user = user;
        this.date = date;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.universityYear = universityYear;
        this.weekdaysSleepDuration = weekdaysSleepDuration;
        this.weekendsSleepDuration = weekendsSleepDuration;
        this.weekdaysStudyHours = weekdaysStudyHours;
        this.weekendsStudyHours = weekendsStudyHours;
        this.weekdaysScreenTime = weekdaysScreenTime;
        this.weekendsScreenTime = weekendsScreenTime;
        this.caffeineIntake = caffeineIntake;
        this.physicalActivityLevel = physicalActivityLevel;
    }

    public double getWeekdaysSleepDuration() {
        return weekdaysSleepDuration;
    }

    public double getWeekendsSleepDuration() {
        return weekendsSleepDuration;
    }

    public double getWeekdaysStudyHours() {
        return weekdaysStudyHours;
    }

    public double getWeekendsStudyHours() {
        return weekendsStudyHours;
    }

    public double getWeekdaysScreenTime() {
        return weekdaysScreenTime;
    }

    public double getWeekendsScreenTime() {
        return weekendsScreenTime;
    }

    public int getCaffeineIntake() {
        return caffeineIntake;
    }

    public String getPhysicalActivityLevel() {
        return physicalActivityLevel;
    }

    public int getSleepQuality() {
        return sleepQuality;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setSleepQuality(int sleepQuality) {
        this.sleepQuality = sleepQuality;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }


}