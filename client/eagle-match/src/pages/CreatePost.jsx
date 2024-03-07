import ForumForm from '../components/ForumForm'

export default function CreatePost() {
	return (
		<>
			<h2>Stwórz post</h2>
			<ForumForm />
		</>
	)
}

export async function action({ request }) {
	const data = request.formData()

	const postData = {
		title: data.get('title'),
		content: data.get('content'),
		author: localStorage.getItem('userId'),
	}

	const response = await fetch('https://localhost:3001/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się utworzyć posta' }, { status: 500 })
	}

	return redirect('/forum')
}
