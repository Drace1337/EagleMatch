import PostItem from '../components/PostItem.jsx'
import { useLoaderData, json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

function PostDetailPage() {
	const data = useLoaderData()
	const post = data[0].post
	const replies = data[1].replies

	return (
		<>
			<PostItem post={post} replies={replies} />
		</>
	)
}

export async function loader({ request, params }) {
	const id = params.postId

	const response1 = await fetch('http://localhost:3001/forum/post/' + id, {
		headers: {
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
	})
	const response2 = await fetch('http://localhost:3001/reply/replies/' + id, {
		headers: {
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
	})
	const response = await Promise.all([response1, response2])
	const data = await Promise.all(response.map(r => r.json()))

	return data
}

export async function action({ request, params }) {
	const id = params.postId
	switch (request.method) {
		case 'DELETE': {
			const response = await fetch('http://localhost:3001/forum/post/' + id, {
				method: request.method,
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
		case 'POST': {
			const data = await request.formData()
			const id = params.postId
			const replyData = {
				comment: data.get('reply'),
				author: JSON.parse(localStorage.getItem('token')).userId,
				post: id,
			}

			const response = await fetch('http://localhost:3001/reply/reply', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
				},
				body: JSON.stringify(replyData),
			})
			if (!response.ok) {
				throw json({ message: 'Nie udało się wysłać odpowiedzi' }, { status: 500 })
			} else {
				return response
			}
		}
	}
}
export default PostDetailPage
