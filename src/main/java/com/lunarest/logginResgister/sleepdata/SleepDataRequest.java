package com.lunarest.logginResgister.sleepdata;

import lombok.Data;

@Data
public class SleepDataRequest {
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
    private String weekdaysSleepStart;
    private String weekdaysSleepEnd;
    private String weekendsSleepStart;
    private String weekendsSleepEnd;
}

