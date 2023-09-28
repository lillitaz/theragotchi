package com.limako.theragotchi.repository;

import com.limako.theragotchi.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionsRepository extends JpaRepository<Question, Long> {
    boolean existsByDescription(String line);

    List<Question> findAllByCategoryId(Long categoryId);
}
