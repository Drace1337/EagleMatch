// import { useEffect, useState } from 'react'
// import PostItem from './PostItem.jsx'

// function Posts() {
// 	const [loadedPosts, setLoadedPosts] = useState([])
// 	useEffect(() => {
// 		async function fetchPosts() {
// 			const response = await fetch('http://localhost:8080/posts')
// 			if (!response.ok) {
// 				throw new Error(data.message || 'Could not fetch posts.')
// 			}
// 			const posts = await response.json()
// 			setLoadedPosts(posts)
// 		}
// 		fetchPosts()
// 	}, [])

// 	return (
// 		<ul className='posts'>
// 			{loadedPosts.map(post => (
// 				<PostItem key={post.id} post={post} />
// 			))}
// 		</ul>
// 	)
// }

// export default Posts

import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom'

export default function Posts({ posts }) {
	const token = useRouteLoaderData('root')
	const submit = useSubmit()
	function startDeleteHandler() {
		const proceed = window.confirm('Are you sure you want to delete this post?')

		if (proceed) {
			submit(null, { method: 'DELETE' })
		}
	}
	return (
		<div>
			<ul>
				{posts.map(post => (
					<li key={post._id}>
						<p>{post.title}</p>
						<Link to={`/post/${post._id}`}>Zobacz post</Link>
						{JSON.parse(localStorage.getItem('userData')).role === 'moderator' && (
							<button onClick={startDeleteHandler}>Usuń post</button>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
