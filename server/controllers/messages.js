const Message = require('../models/message');

exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Fetched messages successfully.',
            messages: messages,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.createMessage = async (req, res, next) => {
    const message = new Message({
        email: req.body.email,
        topic: req.body.topic,
        message: req.body.message,
    });
    try {
        await message.save();
        res.status(201).json({
            message: 'Message created successfully!',
            message: message,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getMessage = async (req, res, next) => {
    const messageId = req.params.messageId;
    try {
        const message = await 
        Message.findById(messageId);
        if (!message) {
            const error = new Error('Could not find message.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Message fetched.',
            message: message,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}