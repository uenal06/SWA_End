package com.mustafa.fullstackbackend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long userId;
    private String username;
    private String password;

    @Column(columnDefinition = "boolean default false")
    private boolean isAdmin;


    private Long quota;

    public User() {
        this.quota = 10485760L; //10MB
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long id) {
        this.userId = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String name) {
        this.password = name;
    }

    public boolean getAdminStatus() {
        return isAdmin;
    }

    public void setAdminStatus(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Long getQuota() {
        return quota;
    }

    public void setQuota(Long quota) {
        this.quota = quota;
    }
}
