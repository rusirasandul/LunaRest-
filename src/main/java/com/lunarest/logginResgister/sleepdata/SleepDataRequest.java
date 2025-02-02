package com.lunarest.logginResgister.sleepdata;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SleepDataRequest {
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
}
