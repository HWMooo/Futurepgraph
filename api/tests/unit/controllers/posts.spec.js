const postsController = require('../../../controllers/posts')
const Post = require('../../../models/post');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('posts controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns posts with a 200 status code', async () => {
            jest.spyOn(Post, 'all', 'get')
                 .mockResolvedValue(['post1', 'post2']);
            await postsController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['post1', 'post2']);
        })
    });

    describe('show', () => {
        test('it returns an author and their posts with a 200 status code', async () => {
            jest.spyOn(Post, 'findByUser')
                .mockResolvedValue(new Post({ id: 1, name: 'Test User'} ));
            jest.spyOn(Post.prototype, 'posts', 'get')
                .mockResolvedValue(['post1', 'post2']);
                
            const mockReq = { params: { name: 'Test User'} }
            await postsController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                id: 1,
                name: 'Test User',
                books: ['post1', 'post2']
            });
        })
    });
    
})
