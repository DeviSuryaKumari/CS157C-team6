package com.cs157c.popcornpicks.repository;

import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import com.cs157c.popcornpicks.model.MovieEntity;


import org.springframework.data.neo4j.repository.query.Query;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MovieRepository extends ReactiveNeo4jRepository<MovieEntity, Integer> {

	@Query("MATCH (m:Movie) RETURN m ORDER BY m.rating DESC LIMIT 50")
	Flux<MovieEntity> getTop50Movies();

	@Query("MATCH (m:Movie) WHERE m.movie_id = $movie_id RETURN m")
	Mono<MovieEntity> findByMovie_id(int movie_id);

	Mono<MovieEntity> findOneByTitle(String title);
	Mono<Void> deleteByTitle(String title);
	Mono<MovieEntity> findOneById(int id);

}