package com.cs157c.popcornpicks.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

@Node("User")
public class UserEntity {
    private String name;
    @Id
    private String username;
    private String password;
    private String email;
    private String dateOfBirth;
    private String gender;
    private boolean isInitialLogin;
    @Relationship(type = "LIKED", direction = Relationship.Direction.OUTGOING)
    private Set<MovieEntity> likedMovies = new HashSet<>();
    @Relationship(type = "DISLIKED", direction = Relationship.Direction.OUTGOING)
    private Set<MovieEntity> dislikedMovies = new HashSet<>();

    @Relationship(type = "FOLLOWS", direction = Relationship.Direction.OUTGOING)
    private Set<UserEntity> followedUsers = new HashSet<>();

    public UserEntity(String name, String username, String password, String email, String dateOfBirth, String gender) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.isInitialLogin = true; // users have an initial login status of true at creation time
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isInitialLogin() {
        return isInitialLogin;
    }

    public void setInitialLogin(boolean initialLogin) {
        isInitialLogin = initialLogin;
    }

    public Set<MovieEntity> getLikedMovies() {
        return likedMovies;
    }

    public void setLikedMovies(Set<MovieEntity> likedMovies) {
        this.likedMovies = likedMovies;
    }

    public Set<MovieEntity> getDislikedMovies() {
        return dislikedMovies;
    }

    public void setDislikedMovies(Set<MovieEntity> dislikedMovies) {
        this.dislikedMovies = dislikedMovies;
    }

    public Set<UserEntity> getFollowedUsers() {
        return followedUsers;
    }

    public void setFollowedUsers(Set<UserEntity> followedUsers) {
        this.followedUsers = followedUsers;
    }
}
