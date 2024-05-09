// Creating a couple of :FOLLOWS relationships

MATCH (devi:User {username: 'devi'})
MATCH (sunidhi:User {username: 'sunidhi'})
MATCH (oscar:User {username: 'oscar'})

MERGE (devi)-[:FOLLOWS]->(sunidhi)
MERGE (sunidhi)-[:FOLLOWS]->(oscar)

// Creating :LIKES and :DISLIKES and :WATCH_LATER relationships

MATCH (devi:User {username: 'devi'})
MATCH (inception:Movie {title: 'Inception'})
MATCH (rebecca:Movie {title: 'Rebecca'})
MATCH (matrix:Movie {title: 'The Matrix'})

MERGE (devi)-[:LIKES]->(inception)
MERGE (devi)-[:DISLIKES]->(rebecca)
MERGE (devi)-[:WATCH_LATER]->(matrix)