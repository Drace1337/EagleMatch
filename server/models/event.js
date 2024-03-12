const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
	title: { type: String, required: true },
	isMatch: { type: Boolean },
	teamOnly: { type: Boolean },
	location: { type: String, required: true },
	date: { type: Date, required: true },
	duration: { type: Number, required: true },
	maxParticipants: { type: Number, required: true },
	description: { type: String, required: true },
	confirmationRequired: { type: Boolean },
	isPrivate: { type: Boolean },
	players: { type: [Schema.Types.ObjectId], ref: 'User'},
	teams: { type: [Schema.Types.ObjectId], ref: 'Team'},
	creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Event', eventSchema)
