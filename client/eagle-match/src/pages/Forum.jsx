import { json, useLoaderData, redirect } from 'react-router-dom'

import Posts from '../components/Posts.jsx'
import { getAuthToken } from '../util/auth.js'
import ForumNavigation from '../components/ForumNavigation.jsx'

function ForumPage() {
	const data = useLoaderData()

	const posts = data.posts

	return (
		<>
			<h2>Forum</h2>
			<ForumNavigation />
			<Posts posts={posts} />
		</>
	)
}

export async function loader({ request }) {
	const response = await fetch('http://localhost:3001/forum/posts', {
		headers: {
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się załadować postów.' }, { status: 500 })
	} else {
		return response
	}
}

export async function action({ request, params }) {
	const id = params.postId

	const response = await fetch('http://localhost:3001/forum/post/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się usunąć posta' }, { status: 500 })
	} else {
		return redirect('/forum')
	}
}

export default ForumPage
