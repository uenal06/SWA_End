package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.FileModel;
import com.mustafa.fullstackbackend.model.Gruppe;
import com.mustafa.fullstackbackend.model.Sharing;
import com.mustafa.fullstackbackend.model.User;
import com.mustafa.fullstackbackend.repository.SharingRepository;
import com.mustafa.fullstackbackend.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class SharingController {
    @Autowired
    SharingRepository sharingRepository;
    @Autowired
    UserGroupRepository userGroupRepository;

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
        if (x) {
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
                    if (x) {
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
    String deleteSharing(@PathVariable Long id) {
        if (!sharingRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        sharingRepository.deleteById(id);
        return "User with id " + id + " has been deleted success.";

    }


    //shows the users that have access to directory
    @GetMapping("sharing/users/directory/{directoryId}")
    List<User> showUsersWithAccessToDirectory(@PathVariable Long directoryId) {
        return sharingRepository.findUsersByDirectoryId(directoryId);
    }

    //Deletes the sharing with user and directory
    @DeleteMapping("/sharing/user/{userId}/directory/{directoryId}")
    String deleteByUserIdAndDirectoryId(@PathVariable Long userId, @PathVariable Long directoryId) {
        Sharing s = sharingRepository.getSharingByUserIdAndDirectoryId(userId, directoryId);
        deleteSharing(s.getSharingId());
        return "Sharing with UserId: " + userId + " And DirectoryId: " + directoryId + "Successfully deleted";
    }

    @GetMapping("/sharing/users/file/{fileId}")
    List<User> showUsersWithAccessToFile(@PathVariable Long fileId) {
        return sharingRepository.findUsersByFileId(fileId);
    }

    @DeleteMapping("/sharing/user/{userId}/file/{fileId}")
    String deleteByUserIdAndFileId(@PathVariable Long userId, @PathVariable Long fileId) {
        Sharing s = sharingRepository.getSharingByUserIdAndFileId(userId, fileId);
        deleteSharing(s.getSharingId());
        return "Sharing with UserId: " + userId + " And FileId: " + fileId + "Successfully deleted";
    }

    @GetMapping("/sharing/groups/directory/{directoryId}")
    List<Gruppe> showGroupsWithAccessToDirectory(@PathVariable Long directoryId) {
        return sharingRepository.findGroupsByDirectoryId(directoryId);
    }

    @DeleteMapping("/sharing/group/{groupId}/directory/{directoryId}")
    String deleteByGroupIdAndDirectoryId(@PathVariable Long groupId, @PathVariable Long directoryId) {
        List<Sharing> s = sharingRepository.getSharingsByGroupIdAndDirectoryId(groupId, directoryId);
        String text = "";
        for (Sharing item : s) {
            deleteSharing(item.getSharingId());
            text.concat(item.getSharingId().toString());
        }
        return "Sharing with UserId: " + text + " And FileId: " + groupId + "Successfully deleted";
    }

    @GetMapping("/sharing/groups/file/{fileId}")
    List<Gruppe> showGroupsWithAccessToFile(@PathVariable Long fileId) {
        return sharingRepository.findGroupsByFileId(fileId);
    }

    @DeleteMapping("/sharing/group/{groupId}/file/{fileId}")
    String deleteByGroupIdAndFileId(@PathVariable Long groupId, @PathVariable Long fileId) {
        List<Sharing> s = sharingRepository.getSharingsByGroupIdAndFileId(groupId, fileId);
        StringBuilder text = new StringBuilder();
        for (Sharing item : s) {
            deleteSharing(item.getSharingId());
            text.append(item.getSharingId().toString());
        }
        return "Sharing with UserId: " + text + " And FileId: " + groupId + "Successfully deleted";
    }


    @PostMapping("/sharing/group/{groupId}")
    Sharing shareWithGroup(@RequestBody Sharing newSharing, @PathVariable Long groupId) {
        boolean x = (newSharing.getFileId() != 0 && newSharing.getDirectoryId() == 0)
                || (newSharing.getFileId() == 0 && newSharing.getDirectoryId() != 0);

        List<User> allUsers = userGroupRepository.getUsersInGroup(groupId);
        for (User u : allUsers) {
            if (x) {
                sharingRepository.save(newSharing);

            }
        }
        return null;
    }

    @GetMapping("/sharing/permission/user/{userId}")
    List<Long> getWritePermissionOfUser(@PathVariable Long userId){
        List<Sharing> myList=sharingRepository.getSharingsByUserId(userId);
        List<Long> usersWithPermission=new ArrayList<>();
        for(Sharing sharing:myList){
            if (sharing.isPermission()){
                usersWithPermission.add(sharing.getFileId());
            }
        }
        return usersWithPermission;
    }

    @GetMapping("/sharing/permission/directory/user/{userId}")
    List<Long> getWritePermissionOfUserDirectory(@PathVariable Long userId){
        List<Sharing> myList=sharingRepository.getSharingsByUserId(userId);
        List<Long> usersWithPermission=new ArrayList<>();
        for(Sharing sharing:myList){
            if (sharing.isPermission()){
                usersWithPermission.add(sharing.getDirectoryId());
            }
        }
        return usersWithPermission;
    }


}
