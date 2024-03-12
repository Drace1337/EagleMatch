const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
            minLength: 8,
            maxLength: 100,
		},
		content: {
			type: String,
			required: true,
            minLength: 1,
            maxLength: 3000,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		replies: {
			type: [Schema.Types.ObjectId],
			ref: 'Reply',
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
