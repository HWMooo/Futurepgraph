DROP TABLE IF EXISTS usersAndPosts;
CREATE TABLE usersAndPosts(
    postId serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    post varchar(500)
);