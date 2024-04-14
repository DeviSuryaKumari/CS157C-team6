package com.cs157c_team6.PopcornPicks.dao;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

import static org.springframework.data.neo4j.core.schema.Relationship.Direction.INCOMING;

@Node("Movie")
    public class MovieEntity {
        @Id
        private final String title;
        @Property("tagline")
        private final String description;
        @Relationship(type = "ACTED_IN", direction = INCOMING)
        private Set<Actor> actors = new HashSet<>();
        @Relationship(type = "DIRECTED", direction = INCOMING)
        private Set<Actor> directors = new HashSet<>();
        public MovieEntity(String title, String description) {
            this.title = title;
            this.description = description;
        }

    }

