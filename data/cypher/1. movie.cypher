LOAD CSV WITH HEADERS FROM 'file:///movies.csv' AS row

MERGE (m:Movie {title: row.movie_title})
SET
    m.poster = row.poster,
    m.releasedYear = toInteger(row.released_year),
    m.genres = split(row.genres, '|'),
    m.rating = row.rating,
    m.plot = row.plot,
    m.duration = row.duration,
    m.certificateType = row.certificate_type,
    m.ratingCount = row.rating_count

RETURN m.title AS title
LIMIT 5