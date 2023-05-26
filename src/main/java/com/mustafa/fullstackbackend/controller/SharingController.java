package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.Sharing;
import com.mustafa.fullstackbackend.model.User;
import com.mustafa.fullstackbackend.repository.SharingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class SharingController {
    @Autowired
    SharingRepository sharingRepository;

    @GetMapping("/sharings")
    List<Sharing> getAllSharedFiles() {
        return sharingRepository.findAll();
    }

    @GetMapping("/sharing/{id}")
    Sharing getSharedById(@PathVariable Long id) {

        return sharingRepository.findById(id).orElseThrow(() -> new RuntimeException("No User with this id"));
    }

    @PostMapping("/sharing")
    Sharing newSharedFile(@RequestBody Sharing newSharing) {
        boolean x = (newSharing.getFileId() != 0 && newSharing.getDirectoryId() == 0)
                || (newSharing.getFileId() == 0 && newSharing.getDirectoryId() != 0);
        boolean y = (newSharing.getUserId() != 0 && newSharing.getGroupId() == 0)
                || (newSharing.getUserId() == 0 && newSharing.getGroupId() != 0);
        if (x && y) {
            return sharingRepository.save(newSharing);

        }
        return null;
    }

    @PutMapping("/sharing/{id}")
    Sharing updateSharing(@RequestBody Sharing newSharing, @PathVariable Long id) {
        return sharingRepository.findById(id)
                .map(sharing -> {
                    boolean x = (newSharing.getFileId() != 0 && newSharing.getDirectoryId() == 0)
                            || (newSharing.getFileId() == 0 && newSharing.getDirectoryId() != 0);
                    boolean y = (newSharing.getUserId() != 0 && newSharing.getGroupId() == 0)
                            || (newSharing.getUserId() == 0 && newSharing.getGroupId() != 0);
                    if (x && y) {
                        sharing.setDirectoryId(newSharing.getDirectoryId());
                        sharing.setFileId(newSharing.getFileId());
                        sharing.setGroupId(newSharing.getGroupId());
                        sharing.setUserId(newSharing.getUserId());
                        sharing.setPermission(newSharing.isPermission());
                    } else {
                        System.out.println("Requirements not Filled");
                    }
                    return sharingRepository.save(sharing);
                }).orElseThrow();

    }

    @DeleteMapping("sharing/{id}")
    String deleteSharing(@PathVariable Long id){
        if (!sharingRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        sharingRepository.deleteById(id);
        return "User with id " + id + " has been deleted success.";

    }

    @GetMapping("/sharing/users/{directoryId}")
    List<User> getAllUsers(@PathVariable Long directoryId){
        return sharingRepository.findUsersByDirectoryId(directoryId);
    }


}
