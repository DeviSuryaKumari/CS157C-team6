// Creating a couple of :FOLLOWS relationships

MATCH (devi:User {username: 'devi'})
MATCH (sunidhi:User {username: 'sunidhi'})
MATCH (oscar:User {username: 'oscar'})

MERGE (devi)-[:FOLLOWS]->(sunidhi)
MERGE (sunidhi)-[:FOLLOWS]->(oscar)
MERGE (oscar)-[:FOLLOWS]->(devi)

// Creating :LIKED and :DISLIKED and :WATCH_LATER relationships

MATCH (devi:User {username: 'devi'})
MATCH (inception:Movie {title: 'Inception'})
MATCH (rebecca:Movie {title: 'Rebecca'})
MATCH (matrix:Movie {title: 'The Matrix'})

MATCH (interstellar:Movie {title: 'Interstellar'})
MATCH (spiderMan:Movie {title: 'Spider-Man: Across the Spider-Verse'})
MATCH (oppenheimer:Movie {title: 'Oppenheimer'})
MATCH (beautifulMind:Movie {title: 'A Beautiful Mind'})
MATCH (findingNemo:Movie {title: 'Finding Nemo'})


MERGE (devi)-[:LIKED]->(inception)
MERGE (devi)-[:DISLIKED]->(rebecca)
MERGE (devi)-[:WATCH_LATER]->(matrix)

MERGE (devi)-[:LIKED]->(interstellar)
MERGE (devi)-[:LIKED]->(spiderMan)
MERGE (devi)-[:LIKED]->(oppenheimer)
MERGE (devi)-[:LIKED]->(beautifulMind)
MERGE (devi)-[:LIKED]->(findingNemo)