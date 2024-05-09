package com.cs157c.popcornpicks.controller;


//import org.neo4j.driver.types.Entity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	//method implementations with walkthroughs below
    @PutMapping
    Mono<MovieEntity> createOrUpdateMovie(@RequestBody MovieEntity newMovie) {
	return movieRepository.save(newMovie);
    }

    @GetMapping(value = { "", "/" }, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<MovieEntity> getMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/by-title")
    Mono<MovieEntity> byTitle(@RequestParam String title) {
        return movieRepository.findOneByTitle(title);
    }
    
    @GetMapping("/by-id")
    Mono<MovieEntity> byTitle(@RequestParam int id) {
        return movieRepository.findOneById(id);
    }
    @DeleteMapping("/delete")
    Mono<Void> deleteByTitle(@RequestParam String title) {
        return movieRepository.deleteByTitle(title);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/top50")
    public Flux<MovieEntity> getTop50Movies() {
        return movieRepository.getTop50Movies();
    }
    
}