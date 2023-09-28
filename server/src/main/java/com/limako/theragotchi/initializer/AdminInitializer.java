package com.limako.theragotchi.initializer;
import com.limako.theragotchi.model.User;
import com.limako.theragotchi.repository.UserRepository;
import com.limako.theragotchi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;
    //in env.properties
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public AdminInitializer(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.findByUserName("admin").isPresent()) {
            User adminUser = new User();
            adminUser.setUserName("admin");
            adminUser.setEmail(("admin@admin.com"));
            adminUser.setPassword(adminPassword);
            userService.createUser(adminUser, "ADMIN", "USER");
        }
    }
}

