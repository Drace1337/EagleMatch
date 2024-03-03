import { json, useLoaderData, redirect } from 'react-router-dom'

import Events from '../components/Events'

export default function HomePage() {
	const data = useLoaderData()
	// if (data.isError) {
	// 	return <p>{data.message}</p>
	// }

	const events = data.events

	return (
		<>
			<h1>Home</h1>

			<Events events={events} />
		</>
	)
}

export async function loader() {
	const response = await fetch('http://localhost:8080/events')

	if (!response.ok) {
		// return { isError: true, message: 'Nie udało się załadować wydarzeń.' }
		// throw new Response(JSON.stringify({ message: 'Nie udało się załadować wydarzeń.' }), { status: 500 })
		return json({ message: 'Nie udało się załadować wydarzeń.' }, { status: 500 })
	} else {
		return response
	}
}

