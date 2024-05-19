// Top-5 movie recommendations for 'devi' user based on her friendships and liked movies

CALL {
    MATCH (user:User {username: 'devi'})-[:FOLLOWS]->(friend:User)-[:LIKED]->(movie:Movie)
    RETURN movie
UNION
    MATCH (user:User {username: 'devi'})-[:LIKED]->(movie2:Movie)
    MATCH (similarMovie: Movie)
    WITH apoc.coll.intersection(similarMovie.genres, movie2.genres) as commonGenres, similarMovie
    WHERE size(commonGenres) > 2
    RETURN DISTINCT similarMovie as movie
}
RETURN movie
ORDER BY movie.rating DESC
LIMIT 5