package com.cs157c.popcornpicks.repository;

import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;

import com.cs157c.popcornpicks.model.MovieEntity;

import reactor.core.publisher.Mono;

public interface MovieRepository extends ReactiveNeo4jRepository<MovieEntity, String> {
	Mono<MovieEntity> findOneByTitle(String title);
	Mono<Void> deleteByTitle(String title);
}