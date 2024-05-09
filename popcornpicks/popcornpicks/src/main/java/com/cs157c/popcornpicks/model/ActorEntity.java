package com.cs157c.popcornpicks.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
//import org.springframework.data.neo4j.core.schema.Property;

@Node("Actor")
public class ActorEntity {
    @Id
	private final String name;

    @Relationship(type = "ACTED_IN", direction = Relationship.Direction.OUTGOING)
    private MovieEntity movie;

    public ActorEntity(String name) {
		this.name = name;
	}

    public String getName() {
        return name;
    }
}
