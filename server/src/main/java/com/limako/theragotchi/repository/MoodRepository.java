package com.limako.theragotchi.repository;

import com.limako.theragotchi.model.Mood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MoodRepository extends JpaRepository<Mood, Long> {
}
