LOAD CSV WITH HEADERS FROM 'file:///actors.csv' AS row

MATCH (m:Movie {title: row.movie})
MERGE (a:Actor {name: row.actor})
MERGE (a)-[:ACTED_IN]->(m)