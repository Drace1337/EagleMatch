const { validationResult } = require('express-validator')

const Event = require('../models/event')
const User = require('../models/user')
const Team = require('../models/team')
const Post = require('../models/post')


exports.getEvents = async (req, res, next) => {
	try {
		const events = await Event.find().populate('creator').sort({ createdAt: -1 })
		res.status(200).json({
			message: 'Fetched events successfully.',
			events: events,
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
	const date = req.body.date
	const duration = req.body.duration
	const maxParticipants = req.body.maxParticipants
	const description = req.body.description
	const confirmationRequired = req.body.confirmationRequired
	const isPrivate = req.body.isPrivate
	const location = req.body.location
	const creator = req.body.creator
	const event = new Event({
		title: title,
		type: type,
		teamOnly: teamOnly,
		location: location,
		date: date,
		duration: duration,
		maxParticipants: maxParticipants,
		description: description,
		confirmationRequired: confirmationRequired,
		isPrivate: isPrivate,
		creator: creator,
	})
	try {
		if (confirmationRequired) {
			const post = new Post({
				title: `Potwierdzenie uczestnictwa w wydarzeniu ${title}`,
				content: `Proszę o potwierdzenie uczestnictwa w wydarzeniu ${title}`,
				author: creator,
				event: event._id,
			})
			await post.save()
			await User.findByIdAndUpdate(req.userId, { $push: { posts: post._id } })
		}
		await event.save()
		await User.findByIdAndUpdate(req.body.creator, { $push: { events: event._id } })
		res.status(201).json({
			message: 'Event created successfully!',
			event: event,
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
		const event = await Event.findById(eventId).populate('teams').populate('players')
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
exports.joinAsPlayer = async (req, res, next) => {
	const eventId = req.params.eventId
	try {
		const event = await Event.findById(eventId)
		if (!event) {
			const error = new Error('Could not find event.')
			error.statusCode = 404
			throw error
		}
		if (event.players.indexOf(req.userId) !== -1) {
			const error = new Error('Already joined.')
			error.statusCode = 403
			throw error
		}
		if (event.maxParticipants <= event.players.length) {
			const error = new Error('Event is full.')
			error.statusCode = 403
			throw error
		}
		event.players.push(req.userId)
		await event.save()
		await User.findByIdAndUpdate(req.userId, { $push: { events: event._id } })
		res.status(200).json({ message: 'Joined event.', event: event })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
exports.joinAsTeam = async (req, res, next) => {
	const eventId = req.params.eventId
	const teamId = req.body.team

	try {
		const event = await Event.findById(eventId)
		if (!event) {
			const error = new Error('Could not find event.')
			error.statusCode = 404
			throw error
		}
		if (event.teams.indexOf(req.teamId) !== -1) {
			const error = new Error('Already joined.')
			error.statusCode = 403
			throw error
		}
		if (event.maxParticipants <= event.teams.length) {
			const error = new Error('Event is full.')
			error.statusCode = 403
			throw error
		}
		event.teams.push(teamId)
		await event.save()
		await Team.findByIdAndUpdate(teamId, { $push: { events: event._id } })
		res.status(200).json({ message: 'Joined event.', event: event })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
