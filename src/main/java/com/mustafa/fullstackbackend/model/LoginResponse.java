package com.mustafa.fullstackbackend.model;

public class LoginResponse {
    private int userId;

    public LoginResponse(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
