package com.limako.theragotchi.controller;

import com.limako.theragotchi.model.Theragotchi;
import com.limako.theragotchi.service.TheragotchiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/theragotchi")
public class TheragotchiController {
    private final TheragotchiService theragotchiService;

    @Autowired
    public TheragotchiController(TheragotchiService theragotchiService) {
        this.theragotchiService = theragotchiService;
    }

    @GetMapping("/{theragotchiId}")
    public Theragotchi getTheragotchi(@PathVariable("theragotchiId") Long theragotchiId) {
        return theragotchiService.getTheragotchiById(theragotchiId);
    }

    @GetMapping("/all")
    public List<Theragotchi> getAllTheragotchi() {
        return theragotchiService.getAllTheragotchi();
    }

    @GetMapping("/{theragotchiId}/imagePath")
    public String getTheragotchiImagePath(@PathVariable("theragotchiId") Long theragotchiId) {
        return getTheragotchi(theragotchiId).getImagePath();
    }

    @GetMapping("/{theragotchiId}/condition")
    public Map<String, Integer> getTheragotchiConditions(@PathVariable("theragotchiId") Long theragotchiId) {
        return theragotchiService.getTheragotchiConditions(theragotchiId);
    }

    @PostMapping("/create")
    public Theragotchi createTheragotchi(@RequestBody Theragotchi newTheragotchi) {
        return theragotchiService.createNewTheragotchi(newTheragotchi);
    }

    @PatchMapping("/{theragotchiId}/feed")
    public void feedTheragotchi(@PathVariable("theragotchiId") Long theragotchiId) {
        theragotchiService.feedTheragotchi(theragotchiId);
    }

    @PatchMapping("/{theragotchiId}/play")
    public void playWithTheragotchi(@PathVariable("theragotchiId") Long theragotchiId) {
        theragotchiService.playWithTheragotchi(theragotchiId);
    }

    @PatchMapping("{theragotchiId}/cuddle")
    public void cuddleTheragotchi(@PathVariable("theragotchiId") Long theragotchiId) {
        theragotchiService.cuddleTheragotchi(theragotchiId);
    }

    @PatchMapping("/{theragotchiId}/clean")
    public void cleanTheragotchi(@PathVariable("theragotchiId") Long theragotchiId) {
        theragotchiService.cleanTheragotchi(theragotchiId);
    }

    @DeleteMapping("/{theragotchiId}/delete")
    public void deleteTheragotchi(@PathVariable("theragotchiId") Long theragotchiId) {
        theragotchiService.deleteTheragotchiById(theragotchiId);
    }

    @PatchMapping("/{theragotchiId}/decreaseValues")
    public void decreaseTheragotchiValues(@PathVariable("theragotchiId") Long theragotchiId) {
        theragotchiService.decreaseTheragotchiValues(theragotchiId);
    }

    @PatchMapping("/{theragotchiId}/update")
    public void updateTheragotchi(@PathVariable("theragotchiId") Long theragotchiId, @RequestBody Theragotchi patchedTheragotchi) {
        theragotchiService.updateTheragotchi(theragotchiId, patchedTheragotchi);
    }

    @GetMapping("/user/{userName}")
    public ResponseEntity<Map<String, Object>> getTheragotchiByUserName(@PathVariable("userName") String userName) {
        return theragotchiService.getTheragotchiByUserName(userName);
    }
}
