package com.limako.theragotchi.service;

import com.limako.theragotchi.model.Goal;
import com.limako.theragotchi.model.User;
import com.limako.theragotchi.model.UserUpdateRequest;
import com.limako.theragotchi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final TheragotchiService theragotchiService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TheragotchiService theragotchiService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.theragotchiService = theragotchiService;
    }

    public boolean validatePassword(String password) {
        //hard version
        /*String regex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);

        if (password.length() < 9) return false;
        return matcher.matches();*/

        return true; //for now
    }

    public boolean validateEmail(String email) {
        /*String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
        return email.matches(emailRegex);*/
        return true;
    }

    public ResponseEntity<Map<String, Object>> createUser(User user, String... roles) {
        Map<String, Object> responseMap = new HashMap<>();

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            responseMap.put("status", 409);
            responseMap.put("message", "E-mail taken");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseMap);
        }

        if (!validateEmail(user.getEmail())) {
            responseMap.put("status", 400);
            responseMap.put("message", "E-mail invalid");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        if (userRepository.findByUserName(user.getUserName()).isPresent()) {
            responseMap.put("status", 409);
            responseMap.put("message", "Username taken");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseMap);
        }

        if (!validatePassword(user.getPassword())) {
            responseMap.put("status", 400);
            responseMap.put("message", "Password invalid");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }
        String encodePassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);
        user.setAuthorities(new HashSet<>(Arrays.asList(roles)));
        userRepository.save(user);
        responseMap.put("status", 200);
        responseMap.put("message", "User " + user.getUserName() + " successfully created");
        return ResponseEntity.ok().body(responseMap);
    }


    public User findUserByUserName(String userName) {
        return userRepository.findByUserName(userName).get();
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId).get();
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }


    public ResponseEntity<Map<String, Object>> logIn(String userName, String password) {
        Optional<User> user = userRepository.findByUserName(userName);
        Map<String, Object> responseMap = new HashMap<>();
        if (user.isEmpty()) {
            responseMap.put("status", 404);
            responseMap.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        } else {
            if (passwordEncoder.matches(password, user.get().getPassword())) {
                responseMap.put("status", 200);
                responseMap.put("message", "User " + user.get().getUserName() + " successfully logged in");
                return ResponseEntity.ok().body(responseMap);
            } else {
                responseMap.put("status", 401);
                responseMap.put("message", "Wrong password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
            }
        }
    }
    public ResponseEntity<String> updateUserById(Long userId, UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
        if (userUpdateRequest.getOldPassword() != null && !passwordEncoder.matches(userUpdateRequest.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password");
        }
        if (userUpdateRequest.getEmail() != null) {
            user.setEmail(userUpdateRequest.getEmail());
        }
        if (userUpdateRequest.getNewPassword() != null) {
            String encodePassword = passwordEncoder.encode(userUpdateRequest.getNewPassword());
            user.setPassword(encodePassword);
        }
        if (userUpdateRequest.getUserName() != null) {
            user.setUserName(userUpdateRequest.getUserName());
        }
        if(userUpdateRequest.getTheragotchiId() != null) {
            user.setTheragotchiId(userUpdateRequest.getTheragotchiId());
        }

        userRepository.save(user);
        if (userUpdateRequest.getTheragotchiName() != null) {
            theragotchiService.updateTheragotchiNameByUser(userUpdateRequest, user);
        }
        return ResponseEntity.ok("User updated successfully");
    }


    public void deleteUser(Long userId) {
        User user = findUserById(userId);
        userRepository.delete(user);
    }

    public void deleteGoal(Long userId, Goal goal) {
        User user = findUserById(userId);
        user.getGoals().remove(goal);
    }

    public void addGoal(Long userId, Goal goal) {
        User user = findUserById(userId);
        user.getGoals().add(goal);
    }
}


