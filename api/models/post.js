const db = require ('../dbConfig/init')

class Post {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.name = data.name
        this.post = data.post

    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const postsData = await db.query(`SELECT * FROM posts;`)
                const posts = postsData.rows.map(d => new Post(d))
                resolve(posts);
            } catch (err) {
                reject("Error retrieving posts")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`SELECT * FROM posts WHERE id = $1;`, [ id ]);
                let post = new Post(postData.rows[0]);
                resolve (post);
            } catch (err) {
                reject('Post not found');
            }
        });
    }

    static findByUser (name) {
        return new Promise (async (resolve, reject) => {
            try {
                let postsData = await db.query(`SELECT * FROM posts WHERE name = $1;`, [ name ]);
                const posts = postsData.rows.map(d => new Post(d))
                resolve (posts);
            } catch (err) {
                reject('Error retrieving user\'s posts');
            }
        });
    }

    static create(name, title, post){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`INSERT INTO usersAndPosts (name, title, post) VALUES ($1, $2, $3) RETURNING *;`, [ name, title, post]);
                let newPost = new Post(postData.rows[0]);
                resolve (newPost);
            } catch (err) {
                reject('Error creating post');
            }
        });
    }

}


module.exports = Post;
