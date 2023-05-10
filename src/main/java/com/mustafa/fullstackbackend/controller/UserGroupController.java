package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.UserGroup;
import com.mustafa.fullstackbackend.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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





    @GetMapping("/usergroup/usernames/{id}")
    public List<String> findUserNamesByGroupId(@PathVariable Long id){
        return userGroupRepository.findUsernamesByGroupId(id);
    }




}



