package com.cs157c.popcornpicks.controller;


//import org.neo4j.driver.types.Entity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;

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
    @GetMapping("/{movie_id}")
    public Mono<MovieEntity> getMovieById(@PathVariable int movie_id) {
        return movieRepository.findByMovie_id(movie_id);
    }

}