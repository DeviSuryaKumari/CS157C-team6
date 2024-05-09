LOAD CSV WITH HEADERS FROM 'file:///directors.csv' AS row

MATCH (m:Movie {title: row.movie})
MERGE (d:Director {name: row.director})
MERGE (d)-[:DIRECTED]->(m)