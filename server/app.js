const path = require('path')
require(`dotenv`).config({ path: `./config/.env` })
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const forumRoutes = require('./routes/forum')
const authRoutes = require('./routes/auth')
const rankingRoutes = require('./routes/rankings')
const locationRoutes = require('./routes/locations')
const teamRoutes = require('./routes/teams')
const eventRoutes = require('./routes/events')
const messageRoutes = require('./routes/messages')
const replyRoutes = require('./routes/replies')

const multer = require('multer')
// const { v4: uuidv4 } = require('uuid')

const app = express()

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'images/logos')
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, uuidv4() + '-' + file.originalname)
// 	},
// })

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
// 		cb(null, true)
// 	} else {
// 		cb(null, false)
// 	}
// }

app.use(bodyParser.json())
// app.use(multer({ storage: storage, fileFilter: fileFilter }).single('logo'))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@eaglematch.nbzjwgh.mongodb.net/EagleMatch?retryWrites=true&w=majority`
	)
	.then(result => {
		app.listen(3001)
	})
	.catch(err => console.log(err))

app.use('/forum', forumRoutes)
app.use('/auth', authRoutes)
app.use('/ranking', rankingRoutes)
app.use('/location', locationRoutes)
app.use('/team', teamRoutes)
app.use('/events', eventRoutes)
app.use('/messages', messageRoutes)
app.use('/reply', replyRoutes)

app.use((error, req, res, next) => {
	console.log(error)
	const status = error.statusCode || 500
	const message = error.message
	const data = error.data
	res.status(status).json({ message: message, data: data })
})
