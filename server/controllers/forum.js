const { validationResult } = require('express-validator')

const Post = require('../models/post')
const User = require('../models/user')

// exports.getPosts = async (req, res, next) => {
//     const currentPage = req.query.page || 1
//     const perPage = 5
//     try {
//         const totalItems = await Post.find().countDocuments()
//         const posts = await Post.find()
//             .populate('author')
//             .sort({ createdAt: -1 })
//             .skip((currentPage - 1) * perPage)
//             .limit(perPage)
//         res.status(200).json({
//             message: 'Fetched posts successfully.',
//             posts: posts,
//             totalItems: totalItems,
//         })
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500
//         }
//         next(err)
//     }
// }

exports.getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find().populate('author').sort({ createdAt: -1 })
		res.status(200).json({
			message: 'Fetched posts successfully.',
			posts: posts,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.createPost = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.')
		error.statusCode = 422
		throw error
	}
	const title = req.body.title
	const content = req.body.content
	const author = req.body.author
	const post = new Post({
		title: title,
		content: content,
		author: author,
	})
	try {
		await post.save()
		await User.findByIdAndUpdate(req.userId, { $push: { posts: post._id } })
		res.status(201).json({
			message: 'Post created successfully!',
			post: post,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.getPost = async (req, res, next) => {
	const postId = req.params.postId
	try {
		const post = await Post.findById(postId).populate('replies')
		if (!post) {
			const error = new Error('Could not find post.')
			error.statusCode = 404
			throw error
		}
		res.status(200).json({ message: 'Post fetched.', post: post })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}

exports.deletePost = async (req, res, next) => {
	const postId = req.params.postId
	try {
		const post = await Post.findById(postId)
		if (!post) {
			const error = new Error('Could not find post.')
			error.statusCode = 404
			throw error
		}
		if (post.author.toString() !== req.userId) {
			const error = new Error('Not authorized!')
			error.statusCode = 403
			throw error
		}
		await Post.findByIdAndRemove(postId)
		const user = await User.findById(req.userId)
		user.posts.pull(postId)
		await user.save()
		res.status(200).json({ message: 'Deleted post.' })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}
		next(err)
	}
}
