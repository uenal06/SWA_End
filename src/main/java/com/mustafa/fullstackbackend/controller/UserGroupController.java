package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.User;
import com.mustafa.fullstackbackend.model.UserGroup;
import com.mustafa.fullstackbackend.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserGroupController {
    @Autowired
    UserGroupRepository userGroupRepository;

    @PostMapping("/usergroup")
    UserGroup newUserGroup(@RequestBody UserGroup newUserGroup) {
        return userGroupRepository.save(newUserGroup);

    }

    @GetMapping("/usergroups")
    List<UserGroup> getAllUserGroups() {
        return userGroupRepository.findAll();
    }

    @GetMapping("/usergroup/{id}")
    UserGroup getUserGroupById(@PathVariable Long id) {
        return userGroupRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }


    @PutMapping("/usergroup/{id}")
    UserGroup changeUserGroup(@RequestBody UserGroup newUserGroup, @PathVariable Long id) {
        return userGroupRepository.findById(id)
                .map(userGroup -> {
                    userGroup.setGroupId(newUserGroup.getGroupId());
                    userGroup.setUserId(newUserGroup.getUserId());
                    return userGroupRepository.save(userGroup);
                }).orElseThrow(() -> new UserNotFoundException(id));

    }

    @GetMapping("/usergroup/{groupId}/{userId}")
    public List<UserGroup> checkIfUserInGroup(
            @PathVariable Long groupId, @PathVariable Long userId) {
        return userGroupRepository.findAllByUserIdAndGroupId(userId, groupId);
    }

    @GetMapping("/getUsersInGroup/{id}")
    public List<User> getUsersInGroup(@PathVariable Long id){
        return userGroupRepository.getUsersInGroup(id);
    }

    @DeleteMapping("/usergroup/{id}/{groupId}")
    String deleteUser(@PathVariable Long id, @PathVariable Long groupId) {
        UserGroup ug=userGroupRepository.findByUserIdAndGroupId(id, groupId);
        if (ug.userGroupId==null) {
            throw new UserNotFoundException(id);
        }
        userGroupRepository.deleteById(ug.userGroupId);
        return "User with id " + id + " has been deleted success.";
    }





    @GetMapping("/usergroup/usernames/{id}")
    public List<String> findUserNamesByGroupId(@PathVariable Long id){
        return userGroupRepository.findUsernamesByGroupId(id);
    }





}



