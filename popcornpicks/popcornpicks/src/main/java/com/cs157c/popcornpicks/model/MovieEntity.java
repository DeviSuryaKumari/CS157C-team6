package com.cs157c.popcornpicks.model;

import java.util.HashSet;
import java.util.Set;

//import org.neo4j.ogm.annotation.GraphId;
//import org.neo4j.ogm.annotation.NodeEntity;
//import org.neo4j.ogm.annotation.Property;
//import org.neo4j.ogm.annotation.Relationship;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node("Movie")
public class MovieEntity {
	@Id
	private final String title;
	//@Property("tagline")
	private final String description;
	@Relationship(type = "ACTED_IN", direction = Relationship.Direction.INCOMING)
	private Set<PersonEntity> actors = new HashSet<>();
	@Relationship(type = "DIRECTED", direction = Relationship.Direction.INCOMING)
	private Set<PersonEntity> directors = new HashSet<>();
	
	public MovieEntity(String title, String description) {
		this.title = title;
		this.description = description;
	}
	//Getters omitted for brevity


    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Set<PersonEntity> getActors() {
        return actors;
    }

	public Set<PersonEntity> getDirectors() {
        return directors;
    }
}
