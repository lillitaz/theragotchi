package com.limako.theragotchi.service;

import com.limako.theragotchi.model.Mood;
import com.limako.theragotchi.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class MoodService {
    private final MoodRepository moodRepository;

    @Autowired
    public MoodService(MoodRepository moodRepository) {
        this.moodRepository = moodRepository;
    }

    public void addMoodToDay(Mood mood) {
        mood.setDate(LocalDate.now());
        moodRepository.save(mood);
    }

    public List<Mood> getMoodListByUserId(Long userId) {
        List<Mood> moodList = new ArrayList<>();
        moodRepository.findAll().forEach(mood -> {
            if (mood.getUserId().equals(userId)) {
                moodList.add(mood);
            }
        });
        return moodList;
    }

    public void addMoodWithDayFromBody(Mood mood, Long userId) {
        mood.setUserId(userId);
        moodRepository.save(mood);
    }
}
