package com.cs157c.popcornpicks.controller;

import org.springframework.web.bind.annotation.*;
import com.cs157c.popcornpicks.model.MovieEntity;
import com.cs157c.popcornpicks.repository.MovieRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/movies")
public class MovieController {
	private final MovieRepository movieRepository;
	public MovieController(MovieRepository movieRepository) {
		this.movieRepository = movieRepository;
	}

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public Flux<MovieEntity> getAllMovies() {
        return movieRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/top50")
    public Flux<MovieEntity> getTop50Movies() {
        return movieRepository.getTop50Movies();
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{title}")
    public Mono<MovieEntity> getMovieByTitle(@PathVariable String title) {
        return movieRepository.findByTitle(title);
    }

}