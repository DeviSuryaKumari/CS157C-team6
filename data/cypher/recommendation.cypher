// Top-5 movie recommendations for 'oscar' user based on his friendships
// Can be improved based on User LIKES, DISLIKES relationships

MATCH (user:User {username: 'oscar'})-[:FOLLOWS]->(friend:User)-[:LIKES]->(movie:Movie)
RETURN movie.title as Movie, movie.rating AS Rating
ORDER BY Rating DESC
LIMIT 5