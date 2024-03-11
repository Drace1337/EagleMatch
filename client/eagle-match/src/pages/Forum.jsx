import { json, useLoaderData, redirect } from 'react-router-dom'

import Posts from '../components/Posts.jsx'
import ForumForm from '../components/ForumForm.jsx'
import { getAuthToken } from '../util/auth.js'

function ForumPage() {
	const data = useLoaderData()
	// if (data.isError) {
	// 	return <p>{data.message}</p>
	// }
	const posts = data.posts

	return (
		<>
			<h1>Forum</h1>
			<Posts posts={posts} />
		</>
	)
}

export async function loader({ request }) {
	const response = await fetch('http://localhost:3001/forum/posts', {
		headers: {
			Authorization: 'Bearer ' + getAuthToken(request),
		},
	})
    console.log(response)

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować postów.' }, { status: 500 })
	} else {
		console.log(response)
		return response
	}
}

export async function action({ request, params }) {
	const id = params.postId

	const response = await fetch('http://localhost:3001/posts/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getAuthToken(request),
		},
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się usunąć posta' }, { status: 500 })
	} else {
		return redirect('/forum')
	}
}

export default ForumPage
