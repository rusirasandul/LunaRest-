package com.lunarest.logginResgister.recommendation;

public class SleepData {
    private double sleepHours;
    private int caffeineIntake;
    private int screenTime;
    private int academicStress;

    public SleepData() {}

    public SleepData(double sleepHours, int caffeineIntake, int screenTime, int academicStress) {
        this.sleepHours = sleepHours;
        this.caffeineIntake = caffeineIntake;
        this.screenTime = screenTime;
        this.academicStress = academicStress;
    }

    public double getSleepHours() { return sleepHours; }
    public void setSleepHours(double sleepHours) { this.sleepHours = sleepHours; }

    public int getCaffeineIntake() { return caffeineIntake; }
    public void setCaffeineIntake(int caffeineIntake) { this.caffeineIntake = caffeineIntake; }

    public int getScreenTime() { return screenTime; }
    public void setScreenTime(int screenTime) { this.screenTime = screenTime; }

    public int getAcademicStress() { return academicStress; }
    public void setAcademicStress(int academicStress) { this.academicStress = academicStress; }
}
