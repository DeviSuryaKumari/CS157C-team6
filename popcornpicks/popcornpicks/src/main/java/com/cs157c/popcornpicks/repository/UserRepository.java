package com.cs157c.popcornpicks.repository;

import com.cs157c.popcornpicks.model.MovieEntity;
import com.cs157c.popcornpicks.model.UserEntity;
import java.util.List;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveNeo4jRepository<UserEntity, String> {

    Mono<UserEntity> findByUsername(String username);
    Flux<UserEntity> findUsersFollowersByUsername(String username);

    @Query("MATCH (u:User {username: $username, password: $password}) RETURN u")
    Mono<UserEntity> login(String username, String password);

    @Query("MATCH (u:User {username: $followerUsername}), (f:User {username: $followedUsername}) MERGE (u)-[:FOLLOWS]->(f) RETURN u")
    Mono<UserEntity> followUser(String followerUsername, String followedUsername);

    @Query("MATCH (u:User {username: $username}), (m:Movie) WHERE m.title IN $movieTitles MERGE (u)-[:LIKED]->(m)")
    Mono<UserEntity> likeMovies(String username, List<String> movieTitles);

    @Query("MATCH (u:User {username: $username}), (m:Movie) WHERE m.title IN $movieTitles MERGE (u)-[:DISLIKED]->(m)")
    Mono<UserEntity> dislikeMovies(String username, List<String> movieTitles);

    @Query("MATCH (u:User {username: $username}) SET u.isInitialLogin = 'No' RETURN u")
    Mono<UserEntity> updateInitialLogin(String username);

    @Query("MATCH (u:User {username: $username}) SET u.profilePicture = $profilePicture RETURN u")
    Mono<UserEntity> updateProfilePicture(String username, String profilePicture);

    @Query("MATCH (u:User {username: $username}) SET u.password = $password RETURN u")
    Mono<UserEntity> updatePassword(String username, String password);

    @Query("MATCH (u:User {username: $username}) SET u.email = $email RETURN u")
    Mono<UserEntity> updateEmail(String username, String email);

}
