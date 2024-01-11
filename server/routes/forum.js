const express = require('express');

const forumController = require('../controllers/forum');

const router = express.Router();

router.get('/posts', forumController.getPosts);

router.post('/post', forumController.createPost);

module.exports = router;