const { validationResult } = require('express-validator')

const Reply = require('../models/reply')
const User = require('../models/user')
const Post = require('../models/post')

exports.getReplies = async (req, res, next) => {
	try {
		const postId = req.params.postId
		const post = await Post.findById(postId)
		if (!post) {
			const error = new Error('Could not find post.')
			error.statusCode = 404
			throw error
		}
		const replies = await Reply.find({ post: postId }).populate('author').sort({ createdAt: -1 })
		res.status(200).json({
			message: 'Fetched replies successfully.',
			replies: replies,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.createReply = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.')
		error.statusCode = 422
		throw error
	}
	const comment = req.body.comment
	const reply = new Reply({
		comment: comment,
		post: req.params.postId,
		author: req.userId,
	})
	try {
		await reply.save()
		const user = await User.findById(req.userId)
		user.replies.push(reply)
		await user.save()
		res.status(201).json({
			message: 'Reply created successfully!',
			reply: reply,
			author: { _id: user._id, name: user.name },
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
