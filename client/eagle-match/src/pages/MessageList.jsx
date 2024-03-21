import { json, useLoaderData } from 'react-router-dom'

import Messages from '../components/Messages.jsx'
import { getAuthToken } from '../util/auth.js'

function MessageList() {
	const data = useLoaderData()

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
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się załadować wiadomości.' }, { status: 500 })
	} else {
		return response
	}
}
