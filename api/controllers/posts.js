const express = require('express');
const router = express.Router();

const Post = require('../models/post')

// posts index route
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.all
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

// posts show route
router.get('/posts/:name', async (req, res) => {
    try {
        const post = await Post.findByUser(req.params.name)
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Create post route
router.post('/', async (req, res) => {
    try {
        const post = await Post.create(req.body.title, req.body.name, req.body.post)
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})



module.exports = router;
