import { json, useLoaderData, redirect } from 'react-router-dom'

import Messages from '../components/Messages.jsx'

function MessageList() {
    const data = useLoaderData()
    // if (data.isError) {
    // 	return <p>{data.message}</p>
    // }

    const messages = data.messages

    return (
        <>
            <h1>Messages</h1>

            <Messages messages={messages} />
        </>
    )
}

export default MessageList

export async function loader() {
    const response = await fetch('http://localhost:3001/messages')

    if (!response.ok) {
        return json({ message: 'Nie udało się załadować wiadomości.' }, { status: 500 })
    } else {
        return response
    }
}