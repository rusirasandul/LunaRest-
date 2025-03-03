package com.lunarest.logginResgister.pythonApi;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/sleep")
public class SleepScoreController {

    private final Api sleepScoreService;

    public SleepScoreController(Api sleepScoreService) {
        this.sleepScoreService = sleepScoreService;
    }

    @PostMapping("/analyze")
    public String analyzeSleep(@RequestBody List<Map<String, Object>> sleepData) {
        return sleepScoreService.processSleepScore(sleepData);
    }
}

