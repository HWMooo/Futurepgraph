const db = require ('../dbConfig')

const Post = require("./post")


class User {
    constructor(data){
        this.id = data.id
        this.pseudonym = data.pseudonym
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(`SELECT * FROM users WHERE id = $1;`, [ id ]); 
                let user = new User(userData.rows[0]);
                resolve (user);
            } catch (err) {
                reject('User not found');
            }
        });
    }

    get posts(){
        return new Promise (async (resolve, reject) => {
            try {
                const postsData = await db.query(`SELECT * FROM posts WHERE user.pseudonym = $1;`, [ this.pseudonym ]);
                const posts = postsData.rows.map(d => new Post(d));
                resolve(posts);
            } catch (err) {
                reject("User's posts could not be found");
            };
        });
    };

}

module.exports = User;
