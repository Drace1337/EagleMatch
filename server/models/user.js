const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		avatar: { type: String, required: false },
		team: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
		posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
		replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
		events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
		roles: { type: String, enum: ['user', 'captain', 'moderator', 'admin'], default: 'user' },
		goals: { type: Number },
		assists: { type: Number },
		cleanSheets: { type: Number },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
