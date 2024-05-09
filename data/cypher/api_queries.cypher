// Cypher query to return unique genres across all movies in the database

MATCH (m:Movie)
UNWIND m.genres AS genres
RETURN DISTINCT genres AS Genres;