package com.limako.theragotchi.controller;

import com.limako.theragotchi.logic.JwtGenerator;
import com.limako.theragotchi.model.User;
import com.limako.theragotchi.model.UserLoginRequest;
import org.springframework.security.core.Authentication;
import com.limako.theragotchi.model.UserUpdateRequest;
import com.limako.theragotchi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserDataController {
    private final UserService userService;
    private final UserUpdateRequest userUpdateRequest;
    private final JwtGenerator jwtGenerator;
    @Autowired
    public UserDataController(UserService userService, UserUpdateRequest userUpdateRequest, JwtGenerator jwtGenerator) {
        this.userService = userService;
        this.userUpdateRequest = userUpdateRequest;
        this.jwtGenerator = jwtGenerator;
    }

    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{userName}")
    public User getUserByUserName(@PathVariable String userName) {
        return userService.findUserByUserName(userName);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody User user) {
        return userService.createUser(user, "USER");
    }
    @PostMapping("/login")
    String jwt(Authentication authentication) {
        return jwtGenerator.generate(authentication);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<String> updateUserById(@PathVariable Long userId, @RequestBody UserUpdateRequest userUpdateRequest) {
        return userService.updateUserById(userId, userUpdateRequest);
    }

    @DeleteMapping("/delete/{userId}")
    public String delete(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return "user successfully deleted";
    }
}
