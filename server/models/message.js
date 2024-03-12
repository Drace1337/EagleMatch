const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 3000,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)