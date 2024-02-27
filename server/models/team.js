const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {type: String, required: true},
    logo: {type: String, required: true},
    captain: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    points: {type: Number},
}, {timestamps: true});

module.exports = mongoose.model('Team', teamSchema);