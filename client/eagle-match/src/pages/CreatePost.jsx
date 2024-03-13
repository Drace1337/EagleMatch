import ForumForm from '../components/ForumForm'
import { json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth'

export default function CreatePost() {
	return (
		<>
			<h2>Stwórz post</h2>
			<ForumForm />
		</>
	)
}

export async function action({ request }) {
	const data = await request.formData()
	console.log(data)
	const token = getAuthToken(request)

	const postData = {
		title: data.get('title'),
		content: data.get('content'),
		author: JSON.parse(localStorage.getItem('userData')).userId,
	}
	console.log(postData)

	const response = await fetch('http://localhost:3001/forum/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(postData),
	})
	console.log(response)

	if (!response.ok) {
		return json({ message: 'Nie udało się utworzyć posta' }, { status: 500 })
	}

	return redirect('/forum')
}
