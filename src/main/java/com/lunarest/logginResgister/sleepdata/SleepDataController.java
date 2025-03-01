package com.lunarest.logginResgister.sleepdata;

import com.lunarest.logginResgister.appuser.AppUser;
import com.lunarest.logginResgister.appuser.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sleepdata")
public class SleepDataController {

    private final SleepDataService sleepDataService;
    private final AppUserService appUserService;

    @Autowired
    public SleepDataController(SleepDataService sleepDataService, AppUserService appUserService) {
        this.sleepDataService = sleepDataService;
        this.appUserService = appUserService;
    }

    @PostMapping
    public void addSleepData(@AuthenticationPrincipal AppUser user,
                             @RequestParam String name,
                             @RequestParam int age,
                             @RequestParam String gender,
                             @RequestParam int universityYear,
                             @RequestParam double weekdaysSleepDuration,
                             @RequestParam double weekendsSleepDuration,
                             @RequestParam double weekdaysStudyHours,
                             @RequestParam double weekendsStudyHours,
                             @RequestParam double weekdaysScreenTime,
                             @RequestParam double weekendsScreenTime,
                             @RequestParam int caffeineIntake,
                             @RequestParam int physicalActivityLevel,
                             @RequestParam String weekdaysSleepStart,
                             @RequestParam String weekdaysSleepEnd,
                             @RequestParam String weekendsSleepStart,
                             @RequestParam String weekendsSleepEnd) {
        sleepDataService.addSleepData(user, LocalDate.now(), name, age, gender, universityYear,
                weekdaysSleepDuration, weekendsSleepDuration, weekdaysStudyHours, weekendsStudyHours,
                weekdaysScreenTime, weekendsScreenTime, caffeineIntake, physicalActivityLevel,
                LocalTime.parse(weekdaysSleepStart), LocalTime.parse(weekdaysSleepEnd),
                LocalTime.parse(weekendsSleepStart), LocalTime.parse(weekendsSleepEnd));
    }

    @GetMapping
    public List<SleepData> getSleepData(@AuthenticationPrincipal AppUser user) {
        return sleepDataService.getSleepDataByUser(user);
    }
}
