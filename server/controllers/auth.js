const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Team = require('../models/team')

exports.register = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed.')
		error.statusCode = 422
		error.data = errors.array()
		throw error
	}

	const email = req.body.email
	const name = req.body.name
	const password = req.body.password
	try {
		const hashedPw = await bcrypt.hash(password, 12)
		const user = new User({
			email: email,
			password: hashedPw,
			name: name,
		})
		const result = await user.save()
		res.status(201).json({ message: 'Użytkownik został stworzony!', userId: result._id })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.login = async (req, res, next) => {
	const email = req.body.email
	const password = req.body.password
	let loadedUser

	try {
		const user = await User.findOne({ email: email })
		if (!user) {
			const error = new Error('Nie ma użytkownika o podanym e-mailu.')
			error.statusCode = 401
			throw error
		}
		loadedUser = user
		const isEqual = await bcrypt.compare(password, user.password)
		if (!isEqual) {
			const error = new Error('Nieprawidłowe hasło!')
			error.statusCode = 401
			throw error
		}
		const token = jwt.sign(
			{
				email: loadedUser.email,
				userId: loadedUser._id.toString(),
				role: loadedUser.roles,
				team: loadedUser.team,
			},
			process.env.JWT_PRIVATE_KEY,
			{ expiresIn: process.env.JWT_EXPIRY }
		)
		res
			.status(200)
			.json({ token: token, userId: loadedUser._id.toString(), role: loadedUser.roles, team: loadedUser.team })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
exports.updateUser = async (req, res, next) => {
	const userId = req.params.userId
	const name = req.body.name
	const avatar = req.file
	avatar.path = avatar.path.replace('\\', '/')
	const email = req.body.email
	try {
		const user = await User.findById(userId)
		if (!user) {
			const error = new Error('Nie znaleziono użytkownika.')
			error.statusCode = 404
			throw error
		}
		if (user._id.toString() !== req.userId) {
			const error = new Error('Brak autoryzacji!')
			error.statusCode = 403
			throw error
		}
		user.name = name
		if (avatar) {
			user.avatar = avatar.path
		}
		user.email = email
		const result = await user.save()
		res.status(200).json({ message: 'Użytkownik zaktualizowany!', user: result })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
exports.changePassword = async (req, res, next) => {
	const userId = req.userId
	const oldPassword = req.body.oldPassword
	const newPassword = req.body.newPassword
	try {
		const user = await User.findById(userId)
		if (!user) {
			const error = new Error('Nie znaleziono użytkownika.')
			error.statusCode = 404
			throw error
		}
		if (user._id.toString() !== req.userId) {
			const error = new Error('Brak autoryzacji!')
			error.statusCode = 403
			throw error
		}

		const isEqual = await bcrypt.compare(oldPassword, user.password)
		if (!isEqual) {
			const error = new Error('Nieprawidłowe hasło!')
			error.statusCode = 401
			throw error
		}
		const hashedPw = await bcrypt.hash(newPassword, 12)
		user.password = hashedPw
		await User.findByIdAndUpdate(userId, { password: hashedPw })
		res.status(200).json({ message: 'Hasło zmienione!' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
exports.getUser = async (req, res, next) => {
	const userId = req.params.userId
	try {
		const user = await User.findById(userId).populate('events').populate('team')
		if (!user) {
			const error = new Error('Nie znaleziono użytkownika.')
			error.statusCode = 404
			throw error
		}
		res.status(200).json({ message: 'Użytkownik znaleziony.', user: user })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
exports.deleteUser = async (req, res, next) => {
	const userId = req.params.userId
	try {
		const user = await User.findById(userId)
		if (!user) {
			const error = new Error('Nie znaleziono użytkownika.')
			error.statusCode = 404
			throw error
		}
		const deletedUser = await User.findByIdAndDelete(userId)
		const team = deletedUser.team
		await Team.findByIdAndUpdate(team, { $pull: { members: userId } })
		res.status(200).json({ message: 'Użytkownik usunięty.' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find({}, 'name email avatar')
		res.status(200).json({ message: 'Użytkownicy znalezieni.', users: users })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
exports.updateUserStats = async (req, res, next) => {
	const userId = req.params.userId
	const role = req.body.role
	const goals = req.body.goals
	const assists = req.body.assists
	const cleanSheets = req.body.cleanSheets
	try {
		const user = await User.findById(userId)
		if (!user) {
			const error = new Error('Nie znaleziono użytkownika.')
			error.statusCode = 404
			throw error
		}
		if (req.role !== 4) {
			const error = new Error('Brak autoryzacji!')
			error.statusCode = 403
			throw error
		}
		user.roles = role
		user.goals = goals
		user.assists = assists
		user.cleanSheets = cleanSheets
		await User.findByIdAndUpdate(userId, { roles: role, goals: goals, assists: assists, cleanSheets: cleanSheets })
		res.status(200).json({ message: 'Statystyki użytkownika zaktualizowane!' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
