package com.limako.theragotchi.model;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "questions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    private String description;
    private Long categoryId;
}
