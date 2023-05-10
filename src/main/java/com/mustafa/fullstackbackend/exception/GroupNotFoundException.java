package com.mustafa.fullstackbackend.exception;

public class GroupNotFoundException extends RuntimeException {
    public GroupNotFoundException(Long id){
        super("Could not find User with id " + id);
    }
}
