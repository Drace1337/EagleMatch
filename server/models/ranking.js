const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rankingSchema = new Schema(
	{
		type: { type: String, enum: ['strzelcy', 'asystenci', 'bramkarze', 'drużyny'], required: true },
		data: {
			type: [
				{
					player: {
						type: Schema.Types.ObjectId,
						ref: 'User',
					},
					team: {
						type: Schema.Types.ObjectId,
						ref: 'Team', // Referencja do modelu zespołu
					},
					stats: {
						// tutaj możesz dodawać specyficzne dla danego typu rankingu pola statystyk
						goals: {
							type: Number,
							default: 0,
						},
						assists: {
							type: Number,
							default: 0,
						},
						cleanSheets: {
							type: Number,
							default: 0,
						},
						points: {
							type: Number,
							default: 0,
						},
						// ...
					},
				},
			],
			default: [],
		},
	},
	{ timestamps: { type: Date, default: Date.now } }
)

module.exports = mongoose.model('Ranking', rankingSchema)
