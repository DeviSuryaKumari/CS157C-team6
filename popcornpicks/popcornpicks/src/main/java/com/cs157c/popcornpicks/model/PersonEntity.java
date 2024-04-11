package com.cs157c.popcornpicks.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Person")
public class PersonEntity {
	@Id
	private final String name;
	private final Integer born;
	public PersonEntity(Integer born, String name) {
		this.born = born;
		this.name = name;
	}
    
    public String getName() {
        return name;
    }

    public Integer born() {
        return born;
    }

}
