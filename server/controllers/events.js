const {validationResult} = require('express-validator');

const Event = require('../models/event')
const User = require('../models/user')

exports.getEvents = async (req, res, next) => {
    const currentPage = req.query.page || 1
    const perPage = 10
    try {
        const totalItems = await Event.find().countDocuments()
        const events = await Event.find()
            .populate('creator')
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
        res.status(200).json({
            message: 'Fetched events successfully.',
            events: events,
            totalItems: totalItems,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createEvent = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.')
        error.statusCode = 422
        throw error
    }
    const title = req.body.title
    const type = req.body.type
    const teamOnly = req.body.teamOnly
    const location = req.body.location
    const date = req.body.date
    const duration = req.body.duration
    const maxPlayers = req.body.maxPlayers
    const description = req.body.description
    const confirmationRequired = req.body.confirmationRequired
    const isPrivate = req.body.isPrivate
    const event = new Event({
        title: title,
        type: type,
        teamOnly: teamOnly,
        location: location,
        date: date,
        duration: duration,
        maxPlayers: maxPlayers,
        description: description,
        confirmationRequired: confirmationRequired,
        isPrivate: isPrivate,
        creator: req.userId,
    })
    try {
        await event.save()
        const user = await User.findById(req.userId)
        user.events.push(event)
        await user.save()
        res.status(201).json({
            message: 'Event created successfully!',
            event: event,
            creator: { _id: user._id, name: user.name },
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getEvent = async (req, res, next) => {
    const eventId = req.params.eventId
    try {
        const event = await Event.findById(eventId)
        if (!event) {
            const error = new Error('Could not find event.')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({ message: 'Event fetched.', event: event })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.cancelEvent = async (req, res, next) => {
    const eventId = req.params.eventId
    try {
        const event = await Event.findById(eventId)
        if (!event) {
            const error = new Error('Could not find event.')
            error.statusCode = 404
            throw error
        }
        if (event.creator.toString() !== req.userId) {
            const error = new Error('Not authorized!')
            error.statusCode = 403
            throw error
        }
        await Event.findByIdAndRemove(eventId)
        const user = await User.findById(req.userId)
        user.events.pull(eventId)
        await user.save()
        res.status(200).json({ message: 'Deleted event.' })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}