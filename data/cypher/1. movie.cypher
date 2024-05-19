LOAD CSV WITH HEADERS FROM 'file:///movies.csv' AS row

MERGE (m:Movie {title: row.movie_title})
SET
    m.poster = row.poster,
    m.released_year = toInteger(row.released_year),
    m.genres = split(row.genres, '|'),
    m.rating = toFloat(row.rating),
    m.plot = row.plot,
    m.duration = row.duration,
    m.certificate_type = row.certificate_type,
    m.rating_count = row.rating_count

RETURN m.title AS title
LIMIT 5