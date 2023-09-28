package com.limako.theragotchi.util;

import com.limako.theragotchi.model.Question;
import com.limako.theragotchi.repository.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

@Component
public class Reader {

    private final QuestionsRepository questionsRepository;

    @Autowired
    public Reader(QuestionsRepository questionsRepository) {
        this.questionsRepository = questionsRepository;
    }

    public void readQuestionsFromFile(String fileName, Long categoryId) {
        try (Stream<String> lines = Files.lines(Path.of(fileName))) {
            lines.forEach(line -> {
                if (!questionsRepository.existsByDescription(line)) {
                    Question question = Question.builder()
                            .description(line)
                            .categoryId(categoryId)
                            .build();
                    questionsRepository.save(question);
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
