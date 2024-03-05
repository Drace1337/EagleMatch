const path = require('path')
require(`dotenv`).config({ path: `./config/.env` })
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const forumRoutes = require('./routes/forum')
const authRoutes = require('./routes/auth')

const app = express()

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4())
	},
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

app.use(bodyParser.json())

app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})

app.use('/forum', forumRoutes)
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
	console.log(error)
	const status = error.statusCode || 500
	const message = error.message
	const data = error.data
	res.status(status).json({ message: message, data: data })
})

mongoose
	.connect(
		'mongodb+srv://jakubrutek:JSM3BF5ikixfUc4W@eaglematch.nbzjwgh.mongodb.net/EagleMatch?retryWrites=true&w=majority'
	)
	.then(result => {
		app.listen(3001)
	})
	.catch(err => console.log(err))
