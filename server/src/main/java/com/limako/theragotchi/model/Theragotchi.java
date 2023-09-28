package com.limako.theragotchi.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "theragotchi")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Theragotchi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theragotchi_id")
    private Long theragotchiId;
    private String theragotchiName;
    @Column(unique = true)
    private Long userId;
    private int mood;
    private int hunger;
    private int entertainment;
    private int affection;
    private int hygiene;
    private String imagePath;

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMood(int mood) {
        if (mood > TheragotchiValues.MAX_VALUE_STATES.getValue()) {
            this.mood = TheragotchiValues.MAX_VALUE_STATES.getValue();
        } else {
            this.mood = mood;
        }
        thergotchiImagePathChooser(mood);
    }

    public void setHunger(int hunger) {
        if (hunger > TheragotchiValues.MAX_VALUE_STATES.getValue()) {
            this.hunger = TheragotchiValues.MAX_VALUE_STATES.getValue();
        } else if (hunger < TheragotchiValues.MIN_VALUE_STATES.getValue()) {
            this.hunger = TheragotchiValues.MIN_VALUE_STATES.getValue();
        } else {
            this.hunger = hunger;
        }
        calculateMood();
    }

    public void setEntertainment(int entertainment) {
        if (entertainment > TheragotchiValues.MAX_VALUE_STATES.getValue()) {
            this.entertainment = TheragotchiValues.MAX_VALUE_STATES.getValue();
        } else if (entertainment < TheragotchiValues.MIN_VALUE_STATES.getValue()) {
            this.entertainment = TheragotchiValues.MIN_VALUE_STATES.getValue();
        } else {
            this.entertainment = entertainment;
        }
        calculateMood();
    }

    public void setAffection(int affection) {
        if (affection > TheragotchiValues.MAX_VALUE_STATES.getValue()) {
            this.affection = TheragotchiValues.MAX_VALUE_STATES.getValue();
        } else if (affection < TheragotchiValues.MIN_VALUE_STATES.getValue()) {
            this.affection = TheragotchiValues.MIN_VALUE_STATES.getValue();
        } else {
            this.affection = affection;
        }
        calculateMood();
    }

    public void setHygiene(int hygiene) {
        if (hygiene > TheragotchiValues.MAX_VALUE_STATES.getValue()) {
            this.hygiene = TheragotchiValues.MAX_VALUE_STATES.getValue();
        } else if (hygiene < TheragotchiValues.MIN_VALUE_STATES.getValue()) {
            this.hygiene = TheragotchiValues.MIN_VALUE_STATES.getValue();
        } else {
            this.hygiene = hygiene;
        }
        calculateMood();
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public int calculateMood() {
        return (getAffection() + getHunger() + getEntertainment() + getHygiene()) / TheragotchiValues.NUM_STATES.getValue();
    }

    public String thergotchiImagePathChooser(int mood) {
        String path = null;
        if (mood < 3) {
            path = ImagePath.IMAGE_SAD.getPath();
        } else if (mood == 3) {
            path = ImagePath.IMAGE_MEDIUM.getPath();
        } else if (mood > 3) {
            path = ImagePath.IMAGE_HAPPY.getPath();
        }
        return path;
    }

}
