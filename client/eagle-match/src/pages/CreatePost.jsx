import ForumForm from '../components/ForumForm'
import { json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth'

export default function CreatePost() {
	return (
		<>
			<ForumForm />
		</>
	)
}

export async function action({ request }) {
	const data = await request.formData()
	const token = JSON.parse(getAuthToken(request)).token

	const postData = {
		title: data.get('title'),
		content: data.get('content'),
		author: JSON.parse(localStorage.getItem('token')).userId,
	}

	const response = await fetch('http://localhost:3001/forum/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(postData),
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się utworzyć posta' }, { status: 500 })
	}

	return redirect('/forum')
}
