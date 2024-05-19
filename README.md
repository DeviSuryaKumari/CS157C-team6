Movie Recommendation Web Application Using Neo4j:
------------------------------------------------
The graph data model for our movie recommender app is as follows:

Entities/Node Labels (comma-separated attributes):
--------------------------------------------------
1. Movie (title, poster, released_year, duration, certificate_type, rating, rating_count, genres, plot) --> With uniqueness constraint on title property
2. Actor (name) --> With uniqueness constraint on name property
3. Director (name) --> With uniqueness constraint on name property
4. User (username, email, password, age, gender, isInitialLogin, profilePicture) --> With existence and uniqueness constraints on username property

Schema Visualization:
---------------------
<img width="1031" alt="Screenshot 2024-05-19 at 12 03 04 AM" src="https://github.com/DeviSuryaKumari/CS157C-team6/assets/11540016/be2e967f-6467-41d0-a0d6-2a390d695751">

Notes:
-----
1. `Explicit Feedback` from user in the web app UI is considered for recommendation logic.
2.  User feedback is assumed to be binary i.e. a user likes/dislikes a movie.
