package com.cs157c.popcornpicks.repository;

import com.cs157c.popcornpicks.model.ActorEntity;

import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import reactor.core.publisher.Flux;

public interface ActorRepository extends ReactiveNeo4jRepository<ActorEntity, String> {

    @Query("MATCH (a:Actor)-[:ACTED_IN]->(m:Movie {title: $title}) RETURN a")
    Flux<ActorEntity> findActorsByMovieTitle(@Param("title") String title);

    @Query("MATCH (a:Actor) RETURN a")
    Flux<ActorEntity> findAll();
}