package com.cs157c.popcornpicks.model;

import java.util.HashSet;
import java.util.Set;
import java.util.List;

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
	private final int movie_id;
	//@Property("year") 
	private final String movie_title;
	private final int released_year;
	private final String duration;
	private final String certificate_type;
	private final double rating;
	private final String rating_count;
	//private final List<String> directors;
	//private final List<String> genres;
	//private final List<String> actors;
	private final String plot;

	//@Property("tagline")
	//private final String description;
	//@Relationship(type = "ACTED_IN", direction = Relationship.Direction.INCOMING)
	//private Set<PersonEntity> actors = new HashSet<>();
	//@Relationship(type = "DIRECTED", direction = Relationship.Direction.INCOMING)
	//private Set<PersonEntity> directors = new HashSet<>();
	
	public MovieEntity(int movie_id, String movie_title, int released_year, String duration, String certificate_type, double rating, String rating_count, String plot) {
		this.movie_id = movie_id;
		this.movie_title = movie_title;
		this.released_year = released_year;
		this.duration = duration;
		this.certificate_type = certificate_type;
		this.rating = rating;
		this.rating_count = rating_count;
		this.plot = plot;
	}
	//Getters omitted for brevity


    public int getId() {
        return movie_id;
    }

    public String getTitle() {
        return movie_title;
    }

    public int getReleasedYear() {
        return released_year;
    }

	public String getDuration() {
        return duration;
    }

	public String getCertificateType() {
        return certificate_type;
    }

	public double getRating() {
        return rating;
    }

	public String getRatingCount() {
        return rating_count;
    }

	public String getPlot() {
        return plot;
    }
}
