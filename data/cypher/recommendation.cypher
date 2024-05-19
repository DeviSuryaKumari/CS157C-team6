// Top-5 movie recommendations for 'oscar' user based on his friendships and liked movies


CALL {
    OPTIONAL MATCH (user:User {username: 'oscar'})-[:LIKED]->(likedMovie:Movie)
    WITH COLLECT(likedMovie.title) AS likedTitles

    OPTIONAL MATCH (user:User {username: 'oscar'})-[:DISLIKED]->(dislikedMovie:Movie)
    WITH likedTitles, COLLECT(dislikedMovie.title) AS dislikedTitles

    MATCH (user:User {username: 'oscar'})-[:FOLLOWS]->(friend:User)-[:LIKED]->(movie:Movie)
    WHERE NOT(movie.title IN dislikedTitles) AND NOT(movie.title IN likedTitles)
    RETURN movie

UNION

    OPTIONAL MATCH (user:User {username: 'oscar'})-[:LIKED]->(likedMovie:Movie)
    WITH COLLECT(likedMovie.title) AS likedTitles, likedMovie

    OPTIONAL MATCH (user:User {username: 'oscar'})-[:DISLIKED]->(dislikedMovie:Movie)
    WITH likedTitles, COLLECT(dislikedMovie.title) AS dislikedTitles, likedMovie

    MATCH (similarMovie: Movie)
    WITH apoc.coll.intersection(similarMovie.genres, likedMovie.genres) as commonGenres, similarMovie
    WHERE size(commonGenres) > 1 AND NOT(similarMovie.title IN dislikedTitles) AND NOT(similarMovie.title IN likedTitles)
    RETURN DISTINCT similarMovie as movie
}
RETURN movie
ORDER BY movie.rating DESC
LIMIT 5
