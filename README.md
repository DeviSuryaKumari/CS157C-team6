Movie Recommendation Web Application Using Neo4j:
------------------------------------------------
The graph data model (tentative - may be extended/modified as needed) for our movie recommender app is as follows:

Entities/Node Labels (comma-separated attributes):
--------------------------------------------------
1. Movie (title, released, genres) --> With uniqueness constraint on title property
2. Actor (name, age, gender) --> With uniqueness constraint on name property
3. Director (name, age, gender) --> With uniqueness constraint on name property
4. User (username, name, age, gender) --> With existence and uniqueness constraints on username property

Schema Visualization:
---------------------
<img width="965" alt="Screenshot 2024-04-07 at 11 26 40 PM" src="https://github.com/DeviSuryaKumari/CS157C-team6/assets/11540016/9c259988-b817-4c0f-8d99-0281a626fa9f">

Notes:
-----
1. `Explicit Feedback` from user in the web app UI is considered for recommendation logic.
2.  User feedback is assumed to be binary i.e. a user likes/dislikes a movie.
