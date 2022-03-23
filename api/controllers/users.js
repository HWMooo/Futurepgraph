const express = require('express');
const router = express.Router();

const User = require('../models/user')

// users show route
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(parseInt(req.params.id))
        res.json(user)
    } catch (err) {
        res.status(400).send({err})
    }
})

// users posts route
router.get('/:pseudonym/posts', async (req, res) => {
    try {
        const user = await User.findByPost(req.params.pseudonym)
        console.log(user)
        const posts = await user.posts
        console.log(posts)
        res.json(posts)
    } catch(err) {
        res.status(404).send({err}) 
    }
})

module.exports = router;
