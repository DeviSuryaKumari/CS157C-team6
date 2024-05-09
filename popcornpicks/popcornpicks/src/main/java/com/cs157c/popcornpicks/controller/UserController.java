package com.cs157c.popcornpicks.controller;

import com.cs157c.popcornpicks.model.MovieEntity;
import com.cs157c.popcornpicks.model.UserEntity;
import com.cs157c.popcornpicks.repository.MovieRepository;
import com.cs157c.popcornpicks.repository.UserRepository;

import java.time.Instant;
import java.util.List;

//import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    public UserController(UserRepository userRepository, MovieRepository movieRepository) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }



    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/create")
    Mono<UserEntity> createOrUpdateUser(@RequestBody UserEntity newUser) {
        return userRepository.save(newUser);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = { "", "/" }, produces = "application/json")
    Flux<UserEntity> getUsers() {
        return userRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/by-username", produces = "application/json")
    Mono<UserEntity> byUsername(@RequestParam String username) {
        return userRepository.findByUsername(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/followers-by-username", produces = "application/json")
    Flux<UserEntity> followersByUsername(@RequestParam String username) {
        return userRepository.findUsersFollowersByUsername(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/like-movies")
    public Mono<UserEntity> likeMovies(@RequestParam String username, @RequestParam List<Integer> movieIds) {
        return userRepository.likeMovies(username, movieIds);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/dislike-movies")
    public Mono<UserEntity> dislikeMovies(@RequestParam String username, @RequestParam List<Integer> movieIds) {
        return userRepository.dislikeMovies(username, movieIds);
    }
}
