package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.Directory;
import com.mustafa.fullstackbackend.model.File;
import com.mustafa.fullstackbackend.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FileController {

    @Autowired
    FileRepository fileRepository;

    @PostMapping("/file")
    File newFile(@RequestBody File newFile){
        return fileRepository.save(newFile);
    }

    @GetMapping("/files")
    List<File> getAllFiles(){
        return fileRepository.findAll();
    }
    @GetMapping("/file/{id}")
    File getFileById(@PathVariable Long id) {
        return fileRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/file/{id}")
    File updateFile(@RequestBody File newFile, @PathVariable Long id) {
        return fileRepository.findById(id)
                .map(file -> {
                    file.setName(newFile.getName());
                    return fileRepository.save(file);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/file/{id}")
    String deleteFile(@PathVariable Long id){
        if(!fileRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        fileRepository.deleteById(id);
        return "File with id "+id+" has been deleted success.";
    }

    @GetMapping("/directory/files/{directoryId}")
    public List<File> findChildDirectoriesOfParentIdAndUser(@PathVariable Long directoryId) {
        return fileRepository.getFilesFromDirectory(directoryId);
    }
}
