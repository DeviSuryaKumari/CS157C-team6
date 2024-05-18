package com.cs157c.popcornpicks.repository;

import com.cs157c.popcornpicks.model.DirectorEntity;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import com.cs157c.popcornpicks.model.MovieEntity;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface MovieRepository extends ReactiveNeo4jRepository<MovieEntity, String> {

	@Query("MATCH (m:Movie) RETURN m")
    Flux<MovieEntity> findAll();

	@Query("MATCH (m:Movie) RETURN m ORDER BY m.rating DESC LIMIT 50")
	Flux<MovieEntity> getTop50Movies();


	@Query("MATCH (m:Movie) UNWIND m.genres AS genres WITH DISTINCT genres RETURN COLLECT(genres)")
	Flux<List<?>> getGenres();

	@Query("MATCH (m:Movie) WHERE $genre IN m.genres RETURN DISTINCT m LIMIT 5")
	Flux<MovieEntity> getDistinctMoviesByGenre(String genre);

	@Query("MATCH (m:Movie) WHERE m.title = $title RETURN m")
	Mono<MovieEntity> findByTitle(String title);

	Mono<Void> deleteByTitle(String title);
}