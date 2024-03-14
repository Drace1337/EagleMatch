import MessageItem from '../components/MessageItem.jsx'
import { useLoaderData, json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function MessageDetailPage() {
	const data = useLoaderData()
	const message = data.message
	console.log(message)
	return (
		<>
			<MessageItem message={message} />
		</>
	)
}

export async function loader({ params, request }) {
	console.log(request)
	console.log(params)
	const id = params.messageId
	console.log(id)
	const token = getAuthToken(request)

	const response = await fetch('http://localhost:3001/messages/message/' + id, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})
	console.log(response)
	if (!response.ok) {
		console.log('siema500')
		return json({ message: 'Nie udało się załadować wiadomości' }, { status: 500 })
	} else {
		console.log('siema200')
		const message = await response.json()
		return message
	}
}
