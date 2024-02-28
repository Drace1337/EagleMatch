const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
	title: { type: String, required: true },
	type: { type: String, required: true },
	teamOnly: { type: Boolean, required: true },
	location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
	date: { type: Date, required: true },
	duration: { type: Number, required: true },
	maxPlayers: { type: Number, required: true },
	description: { type: String, required: true },
	confirmationRequired: { type: Boolean, required: true },
	isPrivate: { type: Boolean, required: true },
	participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Event', eventSchema)
