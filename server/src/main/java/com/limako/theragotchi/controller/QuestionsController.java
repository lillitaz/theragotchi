package com.limako.theragotchi.controller;

import com.limako.theragotchi.model.Question;
import com.limako.theragotchi.service.QuestionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionsController {

    private final QuestionsService questionsService;

    @Autowired
    public QuestionsController(QuestionsService questionsService) {
        this.questionsService = questionsService;
    }

    @GetMapping("/allQuestions")
    public ResponseEntity<?> getAllQuestions() {
        try {
            List<Question> questions = questionsService.getAllQuestions();
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }
    @GetMapping("/category/{categoryId}")
    public List<Question> getQuestionsByCategory(@PathVariable Long categoryId) {
        return questionsService.getQuestionsByCategory(categoryId);
    }

    @GetMapping("/category/{categoryId}/random")
    public Question getRandomQuestionByCategory(@PathVariable Long categoryId) {
        return questionsService.getRandomQuestionByCategory(categoryId);
    }

    @GetMapping("/intro")
    public List<Question> getIntroQuestions() {
        return questionsService.getIntroQuestions();
    }

    @PostMapping ("/add")
    public String addQuestions(@RequestBody Question question) {
        questionsService.addQuestion(question);
        return "Question successfully added!";
    }

    @DeleteMapping ("/delete/{questionId}")
    public String deleteQuestions(@PathVariable Long questionId) {
        questionsService.deleteQuestion(questionId);
        return "Question successfully deleted!";
    }
    @PatchMapping ("/modify/{questionId}")
    public void modifyQuestions(@PathVariable Long questionId, @RequestBody Question updatedQuestion) {
        questionsService.modifyQuestion(questionId, updatedQuestion);
    }
}
