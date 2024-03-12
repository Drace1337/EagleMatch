const express = require('express');
const authAdmin = require('../middleware/authAdmin');

const eventController = require('../controllers/events');

const router = express.Router();

router.get('/events', eventController.getEvents);

router.post('/event', eventController.createEvent);

router.get('/event/:eventId', eventController.getEvent);

router.delete('/event/:eventId', authAdmin, eventController.cancelEvent);

router.put('/event/:eventId', eventController.joinEvent);

module.exports = router;