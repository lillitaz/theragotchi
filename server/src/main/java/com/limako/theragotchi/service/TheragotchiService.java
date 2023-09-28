package com.limako.theragotchi.service;

import com.limako.theragotchi.model.*;
import com.limako.theragotchi.repository.TheragotchiRepository;
import com.limako.theragotchi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TheragotchiService {

    TheragotchiRepository theragotchiRepository;
    UserRepository userRepository;

    @Autowired
    public TheragotchiService(TheragotchiRepository theragotchiRepository, UserRepository userRepository) {
        this.theragotchiRepository = theragotchiRepository;
        this.userRepository = userRepository;
    }

    public Theragotchi createNewTheragotchi(Theragotchi theragotchi) {

        int maxStateValue = TheragotchiValues.MAX_VALUE_STATES.getValue();
        theragotchi.setHunger(maxStateValue);
        theragotchi.setAffection(maxStateValue);
        theragotchi.setHygiene(maxStateValue);
        theragotchi.setEntertainment(maxStateValue);
        theragotchi.setMood(theragotchi.calculateMood());
        theragotchi.setImagePath(theragotchi.thergotchiImagePathChooser(theragotchi.getMood()));
        theragotchiRepository.save(theragotchi);
        return theragotchi;
    }

    public Theragotchi getTheragotchiById(Long theragotchiId) {
        return theragotchiRepository.findById(theragotchiId).get();
    }

    public void updateTheragotchi(Long theragotchiId, Theragotchi patchedTheragotchi) {
        if (theragotchiRepository.existsById(theragotchiId)) {
            Theragotchi existingTheragotchi = theragotchiRepository.findById(theragotchiId).get();
            Field[] fields = patchedTheragotchi.getClass().getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                Object patchedValue = ReflectionUtils.getField(field, patchedTheragotchi);
                Object existingValue = ReflectionUtils.getField(field, existingTheragotchi);
                if (patchedValue != null) {
                    if (!patchedValue.equals(0)) {
                        ReflectionUtils.setField(field, existingTheragotchi, patchedValue);
                    }
                } else {
                    ReflectionUtils.setField(field, existingTheragotchi, existingValue);
                }
            }
            existingTheragotchi.setMood(existingTheragotchi.calculateMood());
            existingTheragotchi.setImagePath(existingTheragotchi.thergotchiImagePathChooser(existingTheragotchi.getMood()));
            theragotchiRepository.save(existingTheragotchi);
        }
    }

    public void deleteTheragotchiById(Long theragotchiId) {
        theragotchiRepository.deleteById(theragotchiId);
    }

    public List<Theragotchi> getAllTheragotchi() {
        return theragotchiRepository.findAll();
    }

    public void feedTheragotchi(Long theragotchiId) {
        Theragotchi theragotchi = theragotchiRepository.findById(theragotchiId).get();
        theragotchi.setHunger(theragotchi.getHunger() + TheragotchiValues.INCREASE_BY.getValue());
        theragotchi.setMood(theragotchi.calculateMood());
        theragotchi.setImagePath(theragotchi.thergotchiImagePathChooser(theragotchi.getMood()));
        theragotchiRepository.save(theragotchi);
    }

    public void playWithTheragotchi(Long theragotchiId) {
        Theragotchi theragotchi = theragotchiRepository.findById(theragotchiId).get();
        theragotchi.setEntertainment(theragotchi.getEntertainment() + TheragotchiValues.INCREASE_BY.getValue());
        theragotchi.setMood(theragotchi.calculateMood());
        theragotchi.setImagePath(theragotchi.thergotchiImagePathChooser(theragotchi.getMood()));
        theragotchiRepository.save(theragotchi);
    }

    public void cuddleTheragotchi(Long theragotchiId) {
        Theragotchi theragotchi = theragotchiRepository.findById(theragotchiId).get();
        theragotchi.setAffection(theragotchi.getAffection() + TheragotchiValues.INCREASE_BY.getValue());
        theragotchi.setMood(theragotchi.calculateMood());
        theragotchiRepository.save(theragotchi);
    }

    public void cleanTheragotchi(Long theragotchiId) {
        Theragotchi theragotchi = theragotchiRepository.findById(theragotchiId).get();
        theragotchi.setHygiene(theragotchi.getHygiene() + TheragotchiValues.INCREASE_BY.getValue());
        theragotchi.setMood(theragotchi.calculateMood());
        theragotchi.setImagePath(theragotchi.thergotchiImagePathChooser(theragotchi.getMood()));
        theragotchiRepository.save(theragotchi);
    }

    public void decreaseTheragotchiValues(Long theragotchiId) {
        Theragotchi theragotchi = theragotchiRepository.findById(theragotchiId).get();
        theragotchi.setHunger(theragotchi.getHunger() - TheragotchiValues.DECREASE_BY.getValue());
        theragotchi.setAffection(theragotchi.getAffection() - TheragotchiValues.DECREASE_BY.getValue());
        theragotchi.setHygiene(theragotchi.getHygiene() - TheragotchiValues.DECREASE_BY.getValue());
        theragotchi.setEntertainment(theragotchi.getEntertainment() - TheragotchiValues.DECREASE_BY.getValue());
        theragotchi.setMood(theragotchi.calculateMood());
        theragotchi.setImagePath(theragotchi.thergotchiImagePathChooser(theragotchi.getMood()));
        theragotchiRepository.save(theragotchi);
    }

    public Map<String, Integer> getTheragotchiConditions(Long theragotchiId) {
        Theragotchi theragotchi = theragotchiRepository.findById(theragotchiId).get();
        return Map.of("hunger", theragotchi.getHunger(), "hygiene", theragotchi.getHygiene(), "affection", theragotchi.getAffection(), "entertainment", theragotchi.getEntertainment());
    }

    public ResponseEntity<Map<String, Object>> getTheragotchiByUserName(String userName) {
        Map<String, Object> responseMap = new HashMap<>();
        User user = userRepository.findByUserName(userName).get();
        if (user == null || user.getTheragotchiId() == null) {
            responseMap.put("status", 404);
            responseMap.put("message", "No Theragotchi available for this user");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        } else {
            Theragotchi theragotchi = theragotchiRepository.findById(user.getTheragotchiId()).orElse(null);
            if (theragotchi == null) {
                responseMap.put("status", 404);
                responseMap.put("message", "Theragotchi not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
            }
            responseMap.put("status", 200);
            responseMap.put("theragotchi", theragotchi);
            return ResponseEntity.ok(responseMap);
        }
    }

    public void updateTheragotchiNameByUser(UserUpdateRequest userUpdateRequest, User user) {
        Theragotchi patchedTheragotchi = new Theragotchi();
        patchedTheragotchi.setTheragotchiName(userUpdateRequest.getTheragotchiName());
        updateTheragotchi(user.getTheragotchiId(), patchedTheragotchi);
    }
}
