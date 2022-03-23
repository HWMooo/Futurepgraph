const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const postRoutes = require('./controllers/posts')
const userRoutes = require('./controllers/users')

server.use('/', postRoutes)
server.use('/users', userRoutes)

const port = process.env.PORT || 3000;

// Root route
server.get('/', (req, res) => res.send('Hello, world!'))

module.exports = server
