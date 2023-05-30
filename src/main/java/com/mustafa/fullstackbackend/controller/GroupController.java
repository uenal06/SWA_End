package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.Gruppe;
import com.mustafa.fullstackbackend.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    @PostMapping("/group")
    Gruppe newGroup(@RequestBody Gruppe newGruppe) {
        return groupRepository.save(newGruppe);
    }

    @GetMapping("/groups")
    List<Gruppe> getAllGroups() {
        return groupRepository.findAll();
    }

    @GetMapping("/group/{id}")
    Gruppe getUserById(@PathVariable Long id) {
        return groupRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/group/{id}")
    Gruppe updateGroup(@RequestBody Gruppe newGruppe, @PathVariable Long id) {
        return groupRepository.findById(id)
                .map(gruppe -> {
                    gruppe.setGroupName(newGruppe.getGroupName());
                    return groupRepository.save(gruppe);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/group/groupnames/{userId}")
    String getGroupsByUsername(@PathVariable Long userId) {
        return groupRepository.findGroupNamesByUserId(userId).toString();
    }

    @DeleteMapping("/group/{id}")
    String deleteGroup(@PathVariable Long id) {
        if (!groupRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        groupRepository.deleteById(id);
        return "User with id " + id + " has been deleted success.";
    }


}