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
	const post = req.body.post
	const author = req.body.author
	const reply = new Reply({
		comment: comment,
		post: post,
		author: author,
	})
	try {
		await reply.save()
		await User.findByIdAndUpdate(req.body.author, { $push: { replies: reply._id } })
		await Post.findByIdAndUpdate(req.body.post, { $push: { replies: reply._id } })
		res.status(201).json({
			message: 'Reply created successfully!',
			reply: reply,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.deleteReply = async (req, res, next) => {
	const replyId = req.params.replyId
	console.log(req.params)
	try {
		const reply = await Reply.findById(replyId)
		if (!reply) {
			const error = new Error('Could not find reply.')
			error.statusCode = 404
			throw error
		}
		if (req.role !== 3) {
			const error = new Error('Not authorized!')
			error.statusCode = 403
			throw error
		}
		await Reply.findByIdAndDelete(replyId)
		await Post.findByIdAndUpdate(reply.post, { $pull: { replies: replyId } })
		await User.findByIdAndUpdate(reply.author, { $pull: { replies: replyId } })
		// const user = await User.findById(req.userId)
		// user.replies.pull(replyId)
		// await user.save()
		res.status(200).json({ message: 'Reply deleted successfully!' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}