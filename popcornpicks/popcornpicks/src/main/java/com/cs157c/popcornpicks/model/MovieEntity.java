package com.cs157c.popcornpicks.model;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node("Movie")
public class MovieEntity {

	@Id
	private final String title;
	private final int released_year;
	private final String duration;
	private final String certificate_type;
	private final double rating;
	private final String rating_count;
	private final List<String> genres;
	private final String plot;
	private final String poster;


	public MovieEntity(String title, int released_year, String duration, String certificate_type, double rating, String rating_count, List<String> genres, String plot, String poster) {
		this.title = title;
		this.released_year = released_year;
		this.duration = duration;
		this.certificate_type = certificate_type;
		this.rating = rating;
		this.rating_count = rating_count;
		this.genres = genres;
		this.plot = plot;
		this.poster = poster;
	}

	public String getTitle() {
		return title;
	}

	public int getReleased_year() {
		return released_year;
	}

	public String getDuration() {
		return duration;
	}

	public String getCertificate_type() {
		return certificate_type;
	}

	public double getRating() {
		return rating;
	}

	public String getRating_count() {
		return rating_count;
	}

	public List<String> getGenres() {
		return genres;
	}

	public String getPlot() {
		return plot;
	}

	public String getPoster() {
		return poster;
	}
}
