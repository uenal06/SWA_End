package com.mustafa.fullstackbackend.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Gruppe { //Name Group geht nicht
    @Id
    @GeneratedValue
    private Long groupId;
    private String groupName;




    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }


}
