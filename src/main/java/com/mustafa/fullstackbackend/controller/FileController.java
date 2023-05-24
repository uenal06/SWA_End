package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.FileModel;

import com.mustafa.fullstackbackend.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class FileController {

    @Autowired
    FileRepository fileRepository;

    @PostMapping("/file")
    FileModel newFile(@RequestBody FileModel newFileModel) {
        return fileRepository.save(newFileModel);
    }

    @GetMapping("/files")
    List<FileModel> getAllFiles() {
        return fileRepository.findAll();
    }

    @GetMapping("/file/{id}")
    FileModel getFileById(@PathVariable Long id) {
        return fileRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/file/{id}")
    FileModel updateFile(@RequestBody FileModel newFileModel, @PathVariable Long id) {
        return fileRepository.findById(id)
                .map(fileModel -> {
                    fileModel.setName(newFileModel.getName());
                    fileModel.setOwnerUserId(newFileModel.getOwnerUserId());
                    fileModel.setDirectoryId(newFileModel.getDirectoryId());
                    fileModel.setSize(newFileModel.getSize());
                    return fileRepository.save(fileModel);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/file/{id}")
    String deleteFile(@PathVariable Long id) {
        if (!fileRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        fileRepository.deleteById(id);
        return "File with id " + id + " has been deleted success.";
    }

    @GetMapping("/directory/files/{directoryId}")
    public List<FileModel> findChildDirectoriesOfParentIdAndUser(@PathVariable Long directoryId) {
        return fileRepository.getFilesFromDirectory(directoryId);
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                // Replace "path/to/save/file" with the desired location to save the file
                String filePath = "C:\\Server\\" + file.getOriginalFilename();
                file.transferTo(new File(filePath));
                return "File uploaded successfully";
            } catch (IOException e) {
                return "Error uploading file: " + e.getMessage();
            }
        }
        return "No file selected";
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws FileNotFoundException, MalformedURLException {
        FileModel fileModel = fileRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Replace "path/to/files/directory" with the actual directory path where files are stored
        String filePath = "C:\\Server\\" + fileModel.getName();
        Path file = Paths.get(filePath);
        Resource resource = new UrlResource(file.toUri());

        if (resource.exists() && resource.isReadable()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileModel.getName());
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } else {
            throw new FileNotFoundException("File not found: " + fileModel.getName());
        }
    }
    }









