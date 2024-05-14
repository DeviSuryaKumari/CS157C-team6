package com.cs157c.popcornpicks.controller;

import com.cs157c.popcornpicks.model.ActorEntity;
import com.cs157c.popcornpicks.repository.ActorRepository;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/actors")
public class ActorController {

    private final ActorRepository actorRepository;

    public ActorController(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public Flux<ActorEntity> getAllActors() {
        return actorRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{title}")
    public Flux<ActorEntity> getActorByMovieTitle(@PathVariable String title) {
        return actorRepository.findActorsByMovieTitle(title);
    }
}
