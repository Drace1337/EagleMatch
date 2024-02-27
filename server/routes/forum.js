const express = require('express');
const authModerator = require('../middleware/authModerator');
const authUser = require('../middleware/authUser');

const forumController = require('../controllers/forum');

const router = express.Router();

router.get('/posts', authUser, forumController.getPosts);

router.post('/post', authUser, forumController.createPost);

router.get('/post/:postId', authUser, forumController.getPost);

router.delete('/post/:postId', authModerator, forumController.deletePost);

module.exports = router;