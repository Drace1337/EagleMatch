const express = require('express')
const authAdmin = require('../middleware/authAdmin')
const authUser = require('../middleware/authUser')
const authCaptain = require('../middleware/authCaptain')

const eventController = require('../controllers/events')

const router = express.Router()

router.get('/events', eventController.getEvents)

router.post('/event', authUser, eventController.createEvent)

router.get('/event/:eventId', eventController.getEvent)

router.patch('/event/:eventId/player', authUser, eventController.joinAsPlayer)

router.patch('/event/:eventId/team', authCaptain, eventController.joinAsTeam)

module.exports = router
