const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
	title: { type: String, required: true },
	isMatch: { type: Boolean, required: true },
	teamOnly: { type: Boolean, required: true },
	location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
	date: { type: Date, required: true },
	duration: { type: Number, required: true },
	maxParticipants: { type: Number, required: true },
	description: { type: String, required: true },
	confirmationRequired: { type: Boolean, required: true },
	isPrivate: { type: Boolean, required: true },
	players: { type: [Schema.Types.ObjectId], ref: 'User'},
	teams: { type: [Schema.Types.ObjectId], ref: 'Team'},
	creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Event', eventSchema)
