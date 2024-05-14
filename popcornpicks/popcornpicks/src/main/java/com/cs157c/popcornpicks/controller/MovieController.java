package com.cs157c.popcornpicks.controller;

import com.cs157c.popcornpicks.model.DirectorEntity;
import com.cs157c.popcornpicks.model.MovieEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.cs157c.popcornpicks.repository.MovieRepository;

import java.util.*;

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
    public List<String> getGenres() {
        Iterable<?> it = movieRepository.getGenres().toIterable();
        String genres = it.iterator().next().toString();
        genres = genres.substring(1, genres.length()-1);
        genres = genres.replaceAll("\"", "");
        return Arrays.asList(genres.split(", "));
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/movies-by-genres")
    public List<MovieEntity> getMoviesByGenres(@RequestParam List<String> genres) {
        if (genres == null || genres.isEmpty()) {
            throw new IllegalArgumentException("Genres list is empty or null");
        }

        List<MovieEntity> moviesByGenres = new ArrayList<>();
        for (String genre : genres) {
            Flux<MovieEntity> movies = movieRepository.getMoviesByGenre(genre);
            moviesByGenres.addAll(Objects.requireNonNull(movies.collectList().block()));
        }
        return moviesByGenres;
    }




}