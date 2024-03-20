import { json, useLoaderData, redirect } from 'react-router-dom'

import Messages from '../components/Messages.jsx'
import { getAuthToken } from '../util/auth.js'

function MessageList() {
	const data = useLoaderData()
	// if (data.isError) {
	// 	return <p>{data.message}</p>
	// }

	const messages = data.messages

	return (
		<>
			<Messages messages={messages} />
		</>
	)
}

export default MessageList

export async function loader({ request }) {
	const response = await fetch('http://localhost:3001/messages/messages', {
		headers: {
			Authorization: 'Bearer ' + getAuthToken(request),
		},
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować wiadomości.' }, { status: 500 })
	} else {
		return response
	}
}
