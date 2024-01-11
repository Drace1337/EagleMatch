const mongoose = require('mongoose')

const Schema = mongoose.Schema

const replySchema = new Schema(
	{
		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		comment: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 3000,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Reply', replySchema)