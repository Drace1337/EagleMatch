const express = require('express')
const { body } = require('express-validator')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authAdmin')
const authCaptain = require('../middleware/authCaptain')

const User = require('../models/user')
const authController = require('../controllers/auth')

const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + '-' + file.originalname)
	},
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

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

router.patch('/change-password/:userId', authUser, authController.changePassword)

router.get('/user/:userId', authUser, authController.getUser)//getowanie obrazków

router.get('/users', authCaptain, authController.getUsers)

router.delete('/user/:userId', authAdmin, authController.deleteUser)

router.patch('/user/:userId', authUser, upload.single('avatar'), authController.updateUser)

router.patch('/user/:userId/stats', authAdmin, authController.updateUserStats)

module.exports = router
