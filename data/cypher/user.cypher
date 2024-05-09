LOAD CSV WITH HEADERS FROM 'file:///users.csv' AS row

MERGE (u:User {username: row.username})
SET
    u.email = row.email,
    u.password = row.password,
    u.age = row.age,
    u.gender = row.gender,
    u.profilePicture = row.profilePicture,
    u.isInitialLogin = row.isInitialLogin

RETURN u.username AS username
LIMIT 5