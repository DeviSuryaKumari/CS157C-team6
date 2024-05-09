// Cypher query to return unique genres (as a list) across all movies in the database

MATCH (m:Movie)
UNWIND m.genres AS genres
WITH DISTINCT genres
RETURN collect(genres)