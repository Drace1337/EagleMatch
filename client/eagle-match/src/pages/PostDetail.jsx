import PostItem from '../components/PostItem.jsx'
import { useLoaderData, json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

function PostDetailPage() {
	const data = useLoaderData()
	const post = data[0].post
	const replies = data[1].replies
	console.log(post)

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
			Authorization: 'Bearer ' + getAuthToken(request),
		},
	})
	const response2 = await fetch('http://localhost:3001/reply/replies/' + id, {
		headers: {
			Authorization: 'Bearer ' + getAuthToken(request),
		},
	})
	const response = await Promise.all([response1, response2])
	const data = await Promise.all(response.map(r => r.json()))
	// console.log(data[0].post.title)
	// if (!data.ok) {
	// 	return json({ message: 'Nie udało się załadować posta' }, { status: 500 })
	// } else {

	// }
	return data
}

export async function action({ request, params }) {
	const id = params.postId
	console.log(request)
	console.log(params)
	console.log(id)
	switch (request.method) {
		case 'DELETE': {
			const response = await fetch('http://localhost:3001/forum/post/' + id, {
				method: request.method,
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
		case 'POST': {
			const data = await request.formData()
			const id = params.postId
			const replyData = {
				comment: data.get('reply'),
				author: JSON.parse(localStorage.getItem('userData')).userId,
				post: id,
			}

			console.log(replyData)
			const response = await fetch('http://localhost:3001/reply/reply', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getAuthToken(request),
				},
				body: JSON.stringify(replyData),
			})
			if (!response.ok) {
				return json({ message: 'Nie udało się wysłać odpowiedzi' }, { status: 500 })
			} else {
				return response
			}
		}
	}
}
export default PostDetailPage
