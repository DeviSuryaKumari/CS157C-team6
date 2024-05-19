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

	@Query("MATCH (u:User {username: $username}), (m:Movie {title:$title}) CREATE (u)-[:WATCH_LATER]->(m) RETURN m")
	Mono<MovieEntity> addMovieToWatchLater(String username, String title);

	@Query("MATCH (u:User {username: $username})-[:WATCH_LATER]->(m:Movie) RETURN m")
	Flux<MovieEntity> getWatchLaterMovies(String username);

	@Query("CALL {\n" +
			"    MATCH (user:User {username: $username})-[:FOLLOWS]->(friend:User)-[:LIKED]->(movie:Movie)\n" +
			"    RETURN movie\n" +
			"UNION\n" +
			"    MATCH (user:User {username: $username})-[:LIKED]->(movie2:Movie)\n" +
			"    MATCH (similarMovie: Movie)\n" +
			"    WITH apoc.coll.intersection(similarMovie.genres, movie2.genres) as commonGenres, similarMovie\n" +
			"    WHERE size(commonGenres) > 2\n" +
			"    RETURN DISTINCT similarMovie as movie\n" +
			"}\n" +
			"RETURN movie\n" +
			"ORDER BY movie.rating DESC\n" +
			"LIMIT 5")
	Flux<MovieEntity> getRecommendationsForUser(String username);
}