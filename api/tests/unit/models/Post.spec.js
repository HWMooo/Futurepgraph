const Post = require('../../../models/Post');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Post', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with posts on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Post.all;
            expect(all).toHaveLength(3)
        })
    });

    // describe('posts', () => {
    //     test('it resolves with formatted posts on successful db query', async () => {
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ 
    //                 rows: [{id: 1, title: 'post1'}, {id: 2, title: 'post2'}]
    //             });
    //         let testPost = new Post({ id: 1, name: 'Test User'})
    //         const posts = await testPost.posts;
    //         expect(posts).toHaveLength(2)
    //         expect(posts[0]).toHaveProperty('path', '/books/1')
    //     })
    // });


    describe('findById', () => {
        test('it resolves with post on successful db query', async () => {
            let postData = { id: 1, title: "Test Title", name: 'Test User', post: "Test post" }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ postData] });
            const result = await Post.findById(1);
            expect(result).toBeInstanceOf(Post)
        })
    });

    describe('create', () => {
        test('it resolves with author on successful db query', async () => {
            let postData = { id: 1, name: 'New Author' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ authorData] });
            const result = await Author.create('New Author');
            expect(result).toBeInstanceOf(Author)
        })
    });

    describe('findOrCreateByName', () => {
        test('it calls on Author.create if name not found', async () => {
            let authorData = { id: 1, name: 'New Author' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ ] });
            const createSpy = jest.spyOn(Author, 'create')
                .mockResolvedValueOnce(new Author(authorData));
            const result = await Author.findOrCreateByName('New Author');
            expect(createSpy).toHaveBeenCalled();
            expect(result).toBeInstanceOf(Author);
        })

        test('it does not call on Author.create if name found', async () => {
            let authorData = { id: 1, name: 'Old Author' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ authorData ] });
            const createSpy = jest.spyOn(Author, 'create')
                .mockResolvedValueOnce(new Author(authorData));
            const result = await Author.findOrCreateByName('Old Author');
            expect(createSpy).not.toHaveBeenCalled();
            expect(result).toBeInstanceOf(Author);
        })
    });
    
})
