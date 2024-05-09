LOAD CSV WITH HEADERS FROM 'file:///movies.csv' AS row

MERGE (m:Movie {title: row.movie_title})
SET
    m.poster = row.poster,
    m.released = toInteger(row.released_year),
    m.genres = split(row.genres, '|'),
    m.rating = row.rating,
    m.plot = row.plot

RETURN m.title AS title
LIMIT 5