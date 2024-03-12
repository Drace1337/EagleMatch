import { json, useLoaderData, redirect } from 'react-router-dom'
import EventsNavigation from '../components/EventsNavigation.jsx'
import Events from '../components/Events.jsx'

function HomePage() {
	const data = useLoaderData()
	// if (data.isError) {
	// 	return <p>{data.message}</p>
	// }

	const events = data.events

	return (
		<>
			<h1>Home</h1>
			<EventsNavigation />
			<Events events={events} />
		</>
	)
}

export async function loader() {
	const response = await fetch('http://localhost:3001/events/events')
	console.log('response', response)

	if (!response.ok) {
		console.log('siema500')
		return json({ message: 'Nie udało się załadować wydarzeń.' }, { status: 500 })
	} else {
		const events = await response.json()
		return events
	}
}

export default HomePage
