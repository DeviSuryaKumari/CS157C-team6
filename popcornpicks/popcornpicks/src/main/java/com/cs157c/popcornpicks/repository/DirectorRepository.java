package com.cs157c.popcornpicks.repository;
import com.cs157c.popcornpicks.model.DirectorEntity;
//import com.cs157c.popcornpicks.model.MovieEntity;
//import com.cs157c.popcornpicks.model.UserEntity;
//import org.springframework.data.neo4j.core.schema.Relationship;


import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;
public interface DirectorRepository extends ReactiveNeo4jRepository<DirectorEntity, String> {

    @Query("MATCH (d:Director)-[:DIRECTED]->(m:Movie {title: $title}) RETURN d")
    Flux<DirectorEntity> findDirectorsByMovieTitle(@Param("title") String title);

    @Query("MATCH (d:Director) RETURN d")
    Flux<DirectorEntity> findAll();
}
