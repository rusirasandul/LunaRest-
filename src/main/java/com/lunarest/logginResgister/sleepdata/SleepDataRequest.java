package com.lunarest.logginResgister.sleepdata;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class SleepDataRequest {

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be a past date")
    private LocalDate dateOfBirth;

    private String gender;
    private int universityYear;

    @Min(value = 0, message = "Duration cannot be negative")
    private double weekdaysSleepDuration;
    private double weekendsSleepDuration;
    private double weekdaysStudyHours;
    private double weekendsStudyHours;
    private double weekdaysScreenTime;
    private double weekendsScreenTime;
    private int caffeineIntake;
    private int physicalActivityLevel;

    private LocalTime weekdaysSleepStart;
    private LocalTime weekdaysSleepEnd;
    private LocalTime weekendsSleepStart;
    private LocalTime weekendsSleepEnd;
}

