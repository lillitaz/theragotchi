package com.limako.theragotchi.model;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
public class UserUpdateRequest {

    private String userName;

    private String email;

    private String newPassword;

    private String oldPassword;

    private Long theragotchiId;

    private List<Goal> goals;

    private String theragotchiName;
}
