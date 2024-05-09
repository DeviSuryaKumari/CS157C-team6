Movie Recommendation Web Application Using Neo4j:
------------------------------------------------
The graph data model (tentative - may be extended/modified as needed) for our movie recommender app is as follows:

Entities/Node Labels (comma-separated attributes):
--------------------------------------------------
1. Movie (title, poster, released, genres, rating, plot) --> With uniqueness constraint on title property
2. Actor (name) --> With uniqueness constraint on name property
3. Director (name) --> With uniqueness constraint on name property
4. User (username, email, password, age, gender, isInitialLogin, profilePicture) --> With existence and uniqueness constraints on username property

Schema Visualization:
---------------------
<img width="1114" alt="Screenshot 2024-05-09 at 1 49 30 AM" src="https://github.com/DeviSuryaKumari/CS157C-team6/assets/11540016/7727114f-0cb4-4810-871c-fd939c3c4787">

Notes:
-----
1. `Explicit Feedback` from user in the web app UI is considered for recommendation logic.
2.  User feedback is assumed to be binary i.e. a user likes/dislikes a movie.
