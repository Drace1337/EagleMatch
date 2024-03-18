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

import { Form, Link, useRouteLoaderData, useSubmit } from 'react-router-dom'
import classes from './Posts.module.scss'

export default function Posts({ posts }) {
	const token = useRouteLoaderData('root')
	const submit = useSubmit()

	return (
		<div className={classes.posts}>
			<ul className={classes.posts__list}>
				{posts.map(post => (
					<li key={post._id} className={classes.posts__list__item}>
						<div className={classes.posts__list__item__text}>
						<p>Temat: {post.title}</p>
						</div>
						<div className={classes.posts__list__item__link}>
							<Link to={`/post/${post._id}`}>Zobacz post</Link>
						</div>
						{/* {JSON.parse(localStorage.getItem('userData')).role === 3 && (
							<Form method='DELETE'>
								<button >Usuń post</button>
							</Form>
						)} */}
					</li>
				))}
			</ul>
		</div>
	)
}
