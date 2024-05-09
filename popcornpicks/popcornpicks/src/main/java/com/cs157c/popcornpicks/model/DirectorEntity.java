package com.cs157c.popcornpicks.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
//import org.springframework.data.neo4j.core.schema.Property;

@Node("Director")
public class DirectorEntity {
    @Id
	private final String name;

    @Relationship(type = "DIRECTED", direction = Relationship.Direction.OUTGOING)
    private MovieEntity movie;

    public DirectorEntity (String name) {
		this.name = name;
	}

    public String getName() {
        return name;
    }
}
