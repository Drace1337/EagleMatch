const express = require('express');
const authModerator = require('../middleware/authModerator');

const replyController = require('../controllers/replies');

const router = express.Router();

router.get('/replies/:postId', replyController.getReplies);

router.post('/reply', replyController.createReply);

router.delete('/reply/:replyId', authModerator, replyController.deleteReply);

module.exports = router;