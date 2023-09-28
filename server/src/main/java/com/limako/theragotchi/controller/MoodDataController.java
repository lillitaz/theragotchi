package com.limako.theragotchi.controller;

import com.limako.theragotchi.model.Mood;
import com.limako.theragotchi.service.MoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/mood")
public class MoodDataController {
    private final MoodService moodService;

    @Autowired
    public MoodDataController(MoodService moodService) {
        this.moodService = moodService;
    }

    @PostMapping("/add")
    public void setMood(@RequestBody Mood mood) {
        moodService.addMoodToDay(mood);
    }

    @GetMapping("/get/{userId}")
    public List<Mood> getMood(@PathVariable Long userId) {
        return moodService.getMoodListByUserId(userId);
    }

    @PostMapping("/add/{userId}/onlyForTesting")
    public void setMoodForTesting(@PathVariable Long userId, @RequestBody Mood mood) {
        moodService.addMoodWithDayFromBody(mood, userId);
    }
}
