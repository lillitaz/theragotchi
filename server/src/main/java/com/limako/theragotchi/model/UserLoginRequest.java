package com.limako.theragotchi.model;

public class UserLoginRequest {

    private String userName;

    private String password;

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
