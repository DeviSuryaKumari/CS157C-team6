package com.cs157c.popcornpicks.controller;

import com.cs157c.popcornpicks.model.MovieEntity;
import com.cs157c.popcornpicks.model.UserEntity;
import com.cs157c.popcornpicks.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.cs157c.popcornpicks.PasswordEncryption;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/create")
    Mono<ResponseEntity<String>> createUser(@RequestBody UserEntity newUser) {
        String hashedPassword = PasswordEncryption.hashPassword(newUser.getPassword());
        UserEntity hashedUser = new UserEntity(newUser.getUsername(), hashedPassword, newUser.getEmail(), newUser.getAge(), newUser.getGender(), newUser.getIsInitialLogin(), newUser.getProfilePicture());
        return userRepository.findByUsername(newUser.getUsername())
                .flatMap(existingUser -> {
                    // User with the same username already exists
                    return Mono.just(ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("User with username " + newUser.getUsername() + " already exists."));
                })
                .switchIfEmpty(
                        // User with the username doesn't exist, proceed to save
                        userRepository.save(hashedUser)
                                .map(savedUser -> ResponseEntity.ok("User created successfully."))
                );
    };


    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/update")
    Mono<ResponseEntity<String>> updateUser(@RequestBody UserEntity updatedUser) {
        return userRepository.findByUsername(updatedUser.getUsername())
                .flatMap(existingUser -> {
                    // User with the same username already exists
                    return userRepository.save(updatedUser)
                            .map(savedUser -> ResponseEntity.ok("User updated successfully."));
                })
                .switchIfEmpty(
                        // User with the username doesn't exist
                        Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("User with username " + updatedUser.getUsername() + " doesn't exist."))
                );
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = { "", "/" }, produces = "application/json")
    Flux<UserEntity> getUsers() {
        return userRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/by-username", produces = "application/json")
    Mono<UserEntity> getUserByUsername(@RequestParam String username) {
        return userRepository.findByUsername(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/login", produces = "application/json")
    public Mono<ResponseEntity<UserEntity>> login(@RequestParam String username, @RequestParam String password) {
        return userRepository.findByUsername(username)
                .flatMap(user -> {
                    if (PasswordEncryption.verifyPassword(password, user.getPassword())) {
                        return Mono.just(ResponseEntity.ok(user));
                    } else {
                        return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
                    }
                });
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/followers-by-username", produces = "application/json")
    Flux<UserEntity> followersByUsername(@RequestParam String username) {
        return userRepository.findUsersFollowersByUsername(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/follow")
    Mono<UserEntity> followUser(@RequestParam String followerUsername, @RequestParam String followedUsername) {
        return userRepository.followUser(followerUsername, followedUsername);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/like-movies")
    public Mono<UserEntity> likeMovies(@RequestParam String username, @RequestParam List<String> movieTitles) {
        return userRepository.likeMovies(username, movieTitles);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/dislike-movies")
    public Mono<UserEntity> dislikeMovies(@RequestParam String username, @RequestParam List<String> movieTitles) {
        return userRepository.dislikeMovies(username, movieTitles);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/update-initial-login")
    public Mono<UserEntity> updateInitialLogin(@RequestParam String username) {
        return userRepository.updateInitialLogin(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/update-profile-picture")
    public Mono<UserEntity> updateProfilePicture(@RequestParam String username, @RequestParam String profilePicture) {
        return userRepository.updateProfilePicture(username, profilePicture);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/update-password")
    public Mono<UserEntity> updatePassword(@RequestParam String username, @RequestParam String password) {
        String hashedPassword = PasswordEncryption.hashPassword(password);
        return userRepository.updatePassword(username, hashedPassword);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/update-email")
    public Mono<UserEntity> updateEmail(@RequestParam String username, @RequestParam String email) {
        return userRepository.updateEmail(username, email);
    }


}
