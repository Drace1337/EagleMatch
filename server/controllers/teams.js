const { validationResult } = require('express-validator')

const Team = require('../models/team')
const User = require('../models/user')

exports.createTeam = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.')
		error.statusCode = 422
		throw error
	}
	if (!req.file) {
		const error = new Error('No image provided.')
		error.statusCode = 422
		throw error
	}
	const name = req.body.name
	const logoUrl = req.file.path.replace('\\', '/')
	console.log(logoUrl)
	const team = new Team({
		name: name,
		logoUrl: logoUrl,
		captain: req.body.captain,
	})
	
	try {
		await team.save()
		const user = await User.findByIdAndUpdate(req.userId, {$push: {teams: team._id}, $set: {roles: 'captain'}})
		res.status(201).json({
			message: 'Team created successfully!',
			team: team,
			captain: { _id: user._id, name: user.name },
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

// exports.getAllTeams = async (req, res, next) => {
// 	const currentPage = req.query.page || 1
// 	const perPage = 10
// 	try {
// 		const totalItems = await Team.find().countDocuments()
// 		const teams = await Team.find()
// 			.populate('captain')
// 			.skip((currentPage - 1) * perPage)
// 			.limit(perPage)
// 		res.status(200).json({
// 			message: 'Fetched teams successfully.',
// 			teams: teams,
// 			totalItems: totalItems,
// 		})
// 	} catch (err) {
// 		if (!err.statusCode) {
// 			err.statusCode = 500
// 		}
// 		next(err)
// 	}
// }

exports.getAllTeams = async (req, res, next) => {
	try {
		const teams = await Team.find().populate('captain')
		res.status(200).json({
			message: 'Fetched teams successfully.',
			teams: teams,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}



exports.getTeam = async (req, res, next) => {
	const teamId = req.params.teamId
	try {
		const team = await Team.findById(teamId)
		if (!team) {
			const error = new Error('Could not find team.')
			error.statusCode = 404
			throw error
		}
		res.status(200).json({ message: 'Team fetched.', team: team })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.updateTeam = async (req, res, next) => {
	const teamId = req.params.teamId
	const name = req.body.name
	const logoUrl = req.body.logoUrl
	try {
		const team = await Team.findById(teamId).populate('captain')
		if (!team) {
			const error = new Error('Could not find team.')
			error.statusCode = 404
			throw error
		}
		if (team.captain._id.toString() !== req.userId) {
			const error = new Error('Not authorized!')
			error.statusCode = 403
			throw error
		}
		team.name = name
		team.logoUrl = logoUrl
		const result = await team.save()
		res.status(200).json({ message: 'Team updated!', team: result })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.deleteTeam = async (req, res, next) => {
	const teamId = req.params.teamId
	try {
		const team = await Team.findById(teamId)
		if (!team) {
			const error = new Error('Could not find team.')
			error.statusCode = 404
			throw error
		}
		if (team.captain.toString() !== req.userId) {
			const error = new Error('Not authorized!')
			error.statusCode = 403
			throw error
		}
		await Team.findByIdAndRemove(teamId)
		const user = await User.findById(req.userId)
		user.teams.pull(teamId)
		await user.save()
		res.status(200).json({ message: 'Deleted team.' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.addMemberToTeam = async (req, res, next) => {
	const teamId = req.params.teamId
	const userId = req.params.userId
	try {
		const team = await Team.findById(teamId)
		if (!team) {
			const error = new Error('Could not find team.')
			error.statusCode = 404
			throw error
		}
		if (team.captain.toString() !== req.userId) {
			const error = new Error('Not authorized!')
			error.statusCode = 403
			throw error
		}
		if (team.members.includes(userId)) {
			const error = new Error('User already in team.')
			error.statusCode = 403
			throw error
		}
		if (team.members.length >= 9) {
			const error = new Error('Team is full.')
			error.statusCode = 403
			throw error
		}
		team.members.push(userId)
		await team.save()
		res.status(200).json({ message: 'Added member to team.' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.removeMemberFromTeam = async (req, res, next) => {
	const teamId = req.params.teamId
	const userId = req.params.userId
	try {
		const team = await Team.findById(teamId)
		if (!team) {
			const error = new Error('Could not find team.')
			error.statusCode = 404
			throw error
		}
		if (req.userId !== team.captain.toString()) {
			const error = new Error('Not authorized!')
			error.statusCode = 403
			throw error
		}
		const isMember = team.members.includes(userId)
		if (!isMember) {
			const error = new Error('User is not a member of this team.')
			error.statusCode = 403
			throw error
		}
		team.members.pull(userId)
		await team.save()
		res.status(200).json({ message: 'Removed member from team.' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
exports.addPointsToTeam = async (req, res, next) => {
	const teamId = req.params.teamId
	const points = req.body.points
	try {
		const team = await Team.findById(teamId)
		if (!team) {
			const error = new Error('Could not find team.')
			error.statusCode = 404
			throw error
		}
		team.points = points
		await team.save()
		res.status(200).json({ message: 'Added points to team.' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
