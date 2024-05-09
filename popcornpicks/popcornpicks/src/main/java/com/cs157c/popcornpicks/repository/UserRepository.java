package com.cs157c.popcornpicks.repository;

import com.cs157c.popcornpicks.model.UserEntity;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveNeo4jRepository<UserEntity, String> {

    Mono<UserEntity> findByUsername(String username);
    Flux<UserEntity> findUsersFollowersByUsername(String username);

}
