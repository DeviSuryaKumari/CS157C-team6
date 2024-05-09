package com.cs157c.popcornpicks.controller;


//import org.neo4j.driver.types.Entity;
import com.cs157c.popcornpicks.model.DirectorEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;

import com.cs157c.popcornpicks.model.MovieEntity;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.cs157c.popcornpicks.repository.MovieRepository;

import java.util.List;

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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/genres")
    public Flux<List<?>> getGenres() {
        return movieRepository.getGenres();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/director/{title}")
    public Flux<DirectorEntity> getDirectorByMovieTitle(@PathVariable String title) {
        return movieRepository.getDirectorByMovieTitle(title);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/actors/{title}")
    public Flux<DirectorEntity> getActorsByMovieTitle(@PathVariable String title) {
        return movieRepository.getActorsByMovieTitle(title);
    }

}