package com.limako.theragotchi.service;

import com.limako.theragotchi.model.Question;
import com.limako.theragotchi.model.Theragotchi;
import com.limako.theragotchi.repository.QuestionsRepository;
import com.limako.theragotchi.util.Reader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.PathVariable;

import java.lang.reflect.Field;
import java.util.List;

@Component
public class QuestionsService implements CommandLineRunner {

    private final Reader reader;

    private final QuestionsRepository questionsRepository;

    @Autowired
    public QuestionsService(Reader reader, QuestionsRepository questionsRepository) {
        this.reader = reader;
        this.questionsRepository = questionsRepository;
    }

    public List<Question> getAllQuestions() {
        return questionsRepository.findAll();
    }

    public List<Question> getQuestionsByCategory(Long categoryId) {
        return questionsRepository.findAllByCategoryId(categoryId);
    }
    public Question getRandomQuestionByCategory(Long categoryId) {
        List<Question> questions = questionsRepository.findAllByCategoryId(categoryId);
        int randomIndex = (int) (Math.random() * questions.size());
        return questions.get(randomIndex);
    }
    public List<Question> getIntroQuestions() {
        return questionsRepository.findAllByCategoryId(1L);
    }
    public void addQuestion(Question question) {
        questionsRepository.save(question);
    }
    public void deleteQuestion(Long questionId) {
        questionsRepository.delete(questionsRepository.findById(questionId).get());
    }
    public void modifyQuestion(Long questionId, Question patchedQuestion) {
        if (questionsRepository.existsById(questionId)) {
            Question existingQuestion = questionsRepository.findById(questionId).get();
            Field[] fields = patchedQuestion.getClass().getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                Object patchedValue = ReflectionUtils.getField(field, patchedQuestion);
                Object existingValue = ReflectionUtils.getField(field, existingQuestion);

                if (patchedValue != null) {
                        ReflectionUtils.setField(field, existingQuestion, patchedValue);
                } else {
                    ReflectionUtils.setField(field, existingQuestion, existingValue);
                }
            }
            questionsRepository.save(existingQuestion);
        }
    }

    @Override
    public void run(String... args) {
        reader.readQuestionsFromFile("src/main/resources/questions/questions-0.txt", 1L);
        reader.readQuestionsFromFile("src/main/resources/questions/questions-1.txt", 2L);
        reader.readQuestionsFromFile("src/main/resources/questions/questions-2.txt", 3L);
        reader.readQuestionsFromFile("src/main/resources/questions/questions-3.txt", 4L);
        reader.readQuestionsFromFile("src/main/resources/questions/questions-goals.txt", 5L);
        reader.readQuestionsFromFile("src/main/resources/questions/questions-daily-mood.txt", 6L);
    }



}
