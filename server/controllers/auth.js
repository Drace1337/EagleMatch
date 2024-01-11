require(`dotenv`).config({ path: `../config/.env` })
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

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
			},
			process.env.JWT_PRIVATE_KEY,
			{ expiresIn: process.env.JWT_EXPIRY }
		)
		res.status(200).json({ token: token, userId: loadedUser._id.toString() })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
