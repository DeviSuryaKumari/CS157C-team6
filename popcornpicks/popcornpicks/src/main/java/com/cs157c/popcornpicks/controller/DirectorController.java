package com.cs157c.popcornpicks.controller;
import com.cs157c.popcornpicks.model.DirectorEntity;
import com.cs157c.popcornpicks.repository.DirectorRepository;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/directors")
public class DirectorController {

    private final DirectorRepository directorRepository;

    public DirectorController(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public Flux<DirectorEntity> getAllDirectors() {
        return directorRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{title}")
    public Flux<DirectorEntity> getDirectorByMovieTitle(@PathVariable String title) {
        return directorRepository.findDirectorsByMovieTitle(title);
    }
}
