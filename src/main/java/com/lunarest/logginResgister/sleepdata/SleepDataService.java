package com.lunarest.logginResgister.sleepdata;

import com.lunarest.logginResgister.appuser.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SleepDataService {

    private final SleepDataRepository sleepDataRepository;

    @Autowired
    public SleepDataService(SleepDataRepository sleepDataRepository) {
        this.sleepDataRepository = sleepDataRepository;
    }

    public void addSleepData(AppUser user, LocalDate date, String name, String dateOfBirth, String gender, int universityYear,
                             double weekdaysSleepDuration, double weekendsSleepDuration, double weekdaysStudyHours,
                             double weekendsStudyHours, double weekdaysScreenTime, double weekendsScreenTime,
                             int caffeineIntake, String physicalActivityLevel) {
        SleepData sleepData = new SleepData(user, date, name, dateOfBirth, gender, universityYear,
                weekdaysSleepDuration, weekendsSleepDuration, weekdaysStudyHours, weekendsStudyHours,
                weekdaysScreenTime, weekendsScreenTime, caffeineIntake, physicalActivityLevel);
        sleepDataRepository.save(sleepData);
    }

    public List<SleepData> getSleepDataByUser(AppUser user) {
        return sleepDataRepository.findByUser(user);
    }
}