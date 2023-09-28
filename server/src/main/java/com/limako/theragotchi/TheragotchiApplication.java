package com.limako.theragotchi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;

@SpringBootApplication(exclude = {SecurityFilterAutoConfiguration.class})
public class TheragotchiApplication {
	public static void main(String[] args) {
		SpringApplication.run(TheragotchiApplication.class, args);
	}
}
