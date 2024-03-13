const express = require('express');
const authAdmin = require('../middleware/authAdmin');

const messageController = require('../controllers/messages');

const router = express.Router();

router.get('/messages', authAdmin, messageController.getMessages);

router.post('/message', messageController.createMessage);

// router.get('/message/:messageId', authAdmin, messageController.getMessage);
router.get('/message/:messageId', messageController.getMessage);

module.exports = router;