package com.mustafa.fullstackbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Directory {
    @Id
    @GeneratedValue
    private long directoryId;

    private String directoryName;
    private long parentDirectoryId;

    private long ownerUserID;

    public long getDirectoryId() {
        return directoryId;
    }

    public void setDirectoryId(long directoryId) {
        this.directoryId = directoryId;
    }

    public String getDirectoryName() {
        return directoryName;
    }

    public void setDirectoryName(String directoryName) {
        this.directoryName = directoryName;
    }

    public long getParentDirectoryId() {
        return parentDirectoryId;
    }

    public void setParentDirectoryId(long parentDirectoryId) {
        this.parentDirectoryId = parentDirectoryId;
    }

    public long getOwnerUserID() {
        return ownerUserID;
    }

    public void setOwnerUserID(long ownerUserID) {
        this.ownerUserID = ownerUserID;
    }
}
