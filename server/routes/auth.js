const express = require('express')
const { body } = require('express-validator')

const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express.Router()

router.put(
	'/register',
	[
		body('email')
			.isEmail()
			.withMessage('Wpisz poprawny e-mail.')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then(userDoc => {
					if (userDoc) {
						return Promise.reject('Taki e-mail już istnieje!')
					}
				})
			})
			.normalizeEmail(),
		body('password').trim().isLength({ min: 5 }),
		body('name').trim().not().isEmpty(),
	],
	authController.register
)

router.post('/login', authController.login)

module.exports = router
