package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.Directory;
import com.mustafa.fullstackbackend.repository.DirectoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")

public class DirectoryController {
    @Autowired
    private DirectoryRepository directoryRepository;

    @PostMapping("/directory")
    Directory newDirectory(@RequestBody Directory newDirectory) {
        return directoryRepository.save(newDirectory);
    }

    @GetMapping("/directories")
    List<Directory> getAllDirectories() {
        return directoryRepository.findAll();
    }


    @GetMapping("/directory/{id}")
    Directory getDirectoryById(@PathVariable Long id) {
        return directoryRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    /**
     * @param newDirectory the new Directory that will replace the old one
     * @param id           id of directory that will be replaced/updated
     * @return updatedDirectory
     */
    @PutMapping("/directory/{id}")
    Directory updateUser(@RequestBody Directory newDirectory, @PathVariable Long id) {
        return directoryRepository.findById(id)
                .map(directory -> {
                    directory.setDirectoryName(newDirectory.getDirectoryName());
                    directory.setParentDirectoryId(newDirectory.getParentDirectoryId());
                    return directoryRepository.save(directory);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    /**
     * @param id id of Directory that will be deleted
     * @return String Deleted Directory
     */
    @DeleteMapping("/directory/{id}")
    String deleteDirectory(@PathVariable Long id) {
        if (!directoryRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        directoryRepository.deleteById(id);
        return "Directory with id " + id + " has been deleted success.";
    }

    /**
     * Finds all Directories that belong to a User
     **/
    @GetMapping("/directory/user/{id}")
    public List<Directory> findDirectoriesOfUser(@PathVariable Long id) {
        return directoryRepository.getDirectoriesByOwnerUserID(id);
    }

    @GetMapping("/directory/user/{ownerUserId}/{parentId}")
    public List<Directory> findChildDirectoriesOfParentIdAndUser(@PathVariable Long ownerUserId, @PathVariable Long parentId) {
        return directoryRepository.getDirectoriesByOwnerUserIDAndParentDirectoryId(ownerUserId,parentId);
    }

    @PostMapping("/directory/user/{id}/0")
    public String getParentId(@PathVariable Long id) {
        Directory dir=directoryRepository.findByOwnerUserIDAndParentDirectoryId(id,0);
        return String.valueOf(dir.getDirectoryId());
    }


}
