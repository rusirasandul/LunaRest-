package com.lunarest.logginResgister.sleepdata;

import com.lunarest.logginResgister.appuser.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

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
    private int age;
    private String gender;
    private int universityYear;

    private double weekdaysSleepDuration;
    private double weekendsSleepDuration;
    private double weekdaysStudyHours;
    private double weekendsStudyHours;
    private double weekdaysScreenTime;
    private double weekendsScreenTime;

    private int caffeineIntake;
    private int physicalActivityLevel;

    private int sleepQuality; // Populated by the ML model
    private String recommendation; // ChatGPT-generated recommendation

    private LocalTime weekdaysSleepStart;
    private LocalTime weekdaysSleepEnd;
    private LocalTime weekendsSleepStart;
    private LocalTime weekendsSleepEnd;

    // Constructor to initialize all fields
    public SleepData(AppUser user, LocalDate date, String name, int age, String gender, int universityYear,
                     double weekdaysSleepDuration, double weekendsSleepDuration, double weekdaysStudyHours,
                     double weekendsStudyHours, double weekdaysScreenTime, double weekendsScreenTime,
                     int caffeineIntake, int physicalActivityLevel, LocalTime weekdaysSleepStart,
                     LocalTime weekdaysSleepEnd, LocalTime weekendsSleepStart, LocalTime weekendsSleepEnd) {
        this.user = user;
        this.date = date;
        this.name = name;
        this.age = age;
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
        this.weekdaysSleepStart = weekdaysSleepStart;
        this.weekdaysSleepEnd = weekdaysSleepEnd;
        this.weekendsSleepStart = weekendsSleepStart;
        this.weekendsSleepEnd = weekendsSleepEnd;
    }

    // Added Getters and Setters for missing fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getUniversityYear() {
        return universityYear;
    }

    public void setUniversityYear(int universityYear) {
        this.universityYear = universityYear;
    }

    public double getWeekdaysSleepDuration() {
        return weekdaysSleepDuration;
    }

    public void setWeekdaysSleepDuration(double weekdaysSleepDuration) {
        this.weekdaysSleepDuration = weekdaysSleepDuration;
    }

    public double getWeekendsSleepDuration() {
        return weekendsSleepDuration;
    }

    public void setWeekendsSleepDuration(double weekendsSleepDuration) {
        this.weekendsSleepDuration = weekendsSleepDuration;
    }

    public double getWeekdaysStudyHours() {
        return weekdaysStudyHours;
    }

    public void setWeekdaysStudyHours(double weekdaysStudyHours) {
        this.weekdaysStudyHours = weekdaysStudyHours;
    }

    public double getWeekendsStudyHours() {
        return weekendsStudyHours;
    }

    public void setWeekendsStudyHours(double weekendsStudyHours) {
        this.weekendsStudyHours = weekendsStudyHours;
    }

    public double getWeekdaysScreenTime() {
        return weekdaysScreenTime;
    }

    public void setWeekdaysScreenTime(double weekdaysScreenTime) {
        this.weekdaysScreenTime = weekdaysScreenTime;
    }

    public double getWeekendsScreenTime() {
        return weekendsScreenTime;
    }

    public void setWeekendsScreenTime(double weekendsScreenTime) {
        this.weekendsScreenTime = weekendsScreenTime;
    }

    public int getCaffeineIntake() {
        return caffeineIntake;
    }

    public void setCaffeineIntake(int caffeineIntake) {
        this.caffeineIntake = caffeineIntake;
    }

    public int getPhysicalActivityLevel() {
        return physicalActivityLevel;
    }

    public void setPhysicalActivityLevel(int physicalActivityLevel) {
        this.physicalActivityLevel = physicalActivityLevel;
    }

    public int getSleepQuality() {
        return sleepQuality;
    }

    public void setSleepQuality(int sleepQuality) {
        this.sleepQuality = sleepQuality;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public LocalTime getWeekdaysSleepStart() {
        return weekdaysSleepStart;
    }

    public void setWeekdaysSleepStart(LocalTime weekdaysSleepStart) {
        this.weekdaysSleepStart = weekdaysSleepStart;
    }

    public LocalTime getWeekdaysSleepEnd() {
        return weekdaysSleepEnd;
    }

    public void setWeekdaysSleepEnd(LocalTime weekdaysSleepEnd) {
        this.weekdaysSleepEnd = weekdaysSleepEnd;
    }

    public LocalTime getWeekendsSleepStart() {
        return weekendsSleepStart;
    }

    public void setWeekendsSleepStart(LocalTime weekendsSleepStart) {
        this.weekendsSleepStart = weekendsSleepStart;
    }

    public LocalTime getWeekendsSleepEnd() {
        return weekendsSleepEnd;
    }

    public void setWeekendsSleepEnd(LocalTime weekendsSleepEnd) {
        this.weekendsSleepEnd = weekendsSleepEnd;
    }
}
