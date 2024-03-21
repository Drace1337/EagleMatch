import MessageItem from '../components/MessageItem.jsx'
import { useLoaderData, json } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function MessageDetailPage() {
	const data = useLoaderData()
	const message = data.message
	return (
		<>
			<MessageItem message={message} />
		</>
	)
}

export async function loader({ params, request }) {
	const id = params.messageId
	const token = JSON.parse(getAuthToken(request)).token

	const response = await fetch('http://localhost:3001/messages/message/' + id, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})
	if (!response.ok) {
		throw json({ message: 'Nie udało się załadować wiadomości' }, { status: 500 })
	} else {
		const message = await response.json()
		return message
	}
}
