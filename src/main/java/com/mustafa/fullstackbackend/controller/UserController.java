package com.mustafa.fullstackbackend.controller;

import com.mustafa.fullstackbackend.exception.UserNotFoundException;
import com.mustafa.fullstackbackend.model.User;
import com.mustafa.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/login/{username}/{password}")
    User getAuthUser(@PathVariable String username, @PathVariable String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }


    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setPassword(newUser.getPassword());
                    user.setAdminStatus(newUser.getAdminStatus());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted success.";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User credentials) {
        // Perform authentication logic
        // Compare the provided username and password with your stored credentials
        // Return the appropriate response based on the authentication result
        User user = userRepository.findByUsernameAndPassword(credentials.getUsername(), credentials.getPassword());

        if (user != null) {
            if (user.getAdminStatus()) {
                return ResponseEntity.ok().body(String.valueOf(user.getUserId().toString()) + "admin");
            }
            // Authentication successful
            // Return the user ID as a response
            return ResponseEntity.ok().body(String.valueOf(user.getUserId().toString()));
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }


}