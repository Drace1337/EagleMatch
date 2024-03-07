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

import { Link } from 'react-router-dom'

export default function Posts({ posts }) {
	return (
		<div>
			
		<ul>
			{posts.map(post => (
				<li key={post.id}>
					<Link to={post.id}>{post.title}</Link>
				</li>
			))}
		</ul>
		</div>
	)
}