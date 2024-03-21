import { json, useLoaderData } from 'react-router-dom'
import EventsNavigation from '../components/EventsNavigation.jsx'
import Events from '../components/Events.jsx'
import classes from '../components/PageContent.module.scss'

function HomePage() {
	const data = useLoaderData()

	const events = data.events

	return (
		<div className={classes.content}>
			<EventsNavigation />
			<Events events={events} />
		</div>
	)
}

export async function loader() {
	const response = await fetch('http://localhost:3001/events/events')

	if (!response.ok) {
		throw json({ message: 'Nie udało się załadować wydarzeń.' }, { status: 500 })
	} else {
		const events = await response.json()
		return events
	}
}

export default HomePage
