const { validationResult } = require('express-validator')

const Team = require('../models/team')
const User = require('../models/user')

exports.createTeam = async (req, res, next) => {
	const name = req.body.name
	console.log(req.body)
	// const logoUrl = req.file.path.replace('\\', '/')
	const logo = req.file
	console.log(logo)
	logo.path = logo.path.replace('\\', '/')
	console.log(logo)
	if (!logo) {
		const error = new Error('No image provided.')
		error.statusCode = 422
		throw error
	}
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
	const logoUrl = logo.path

	const team = new Team({
		name: name,
		logo: logoUrl,
		captain: req.body.captain,
		members: [req.body.captain],
	})

	try {
		await team.save()
		await User.findByIdAndUpdate(req.userId, { $push: { team: team._id }, $set: { roles: 2 } })
		res.status(201).json({
			message: 'Team created successfully!',
			team: team,
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
		const teams = await Team.find()
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
		const team = await Team.findById(teamId).populate('captain').populate('members')
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
	const logo = req.file
	logo.path = logo.path.replace('\\', '/')
	console.log(teamId)
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
		if (logo) {
			team.logo = logo.path
		}
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
	console.log(req.params)
	console.log(teamId)
	try {
		const team = await Team.findById(teamId)
		if (!team) {
			const error = new Error('Could not find team.')
			error.statusCode = 404
			throw error
		}
		if (req.role < 2) {
			const error = new Error('Not authorized!')
			error.statusCode = 403
			throw error
		}
		await User.updateMany({}, { $pull: { team: teamId } })
		await Team.findByIdAndDelete(teamId)
		// user.team.pull(teamId)
		// await user.save()
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
		console.log(userId)
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
