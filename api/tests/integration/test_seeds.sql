TRUNCATE usersAndPosts RESTART IDENTITY;

INSERT INTO usersAndPosts (name, title, post) 
VALUES
(
    'Test Post 1', 
    'Test Title 1', 
    $str$Test post 1 description$str$
),
(
    'Test Post 2', 
    'Test Title 2', 
    $str$Test post 2 description$str$
),
(
    'Test Post 3',
    'Test Title 3', 
    $str$Test post 3 description$str$
);
