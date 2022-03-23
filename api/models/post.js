const db = require ('../dbConfig')

class Post {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.pseudonym = data.pseudonym
        this.body = data.body

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

    static findByUser (pseudonym) {
        return new Promise (async (resolve, reject) => {
            try {
                let postsData = await db.query(`SELECT * FROM posts WHERE pseudonym = $1;`, [ pseudonym ]);
                const posts = postsData.rows.map(d => new Post(d))
                resolve (posts);
            } catch (err) {
                reject('Error retrieving user\'s posts');
            }
        });
    }

    static create(title, pseudonym, body){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`INSERT INTO posts (title, pseudonym, body) VALUES ($1, $2, $3) RETURNING *;`, [ title, pseudonym, body]);
                let newPost = new Post(postData.rows[0]);
                resolve (newPost);
            } catch (err) {
                reject('Error creating post');
            }
        });
    }

}


module.exports = Post;
