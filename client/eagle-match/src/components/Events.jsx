import { useEffect, useState } from 'react'
import EventItem from './EventItem.jsx'

export default function Events() {
	const [loadedEvents, setLoadedEvents] = useState([])
	useEffect(() => {
		async function fetchEvents() {
			const response = await fetch('http://localhost:8080/events')
			if (!response.ok) {
				throw new Error(data.message || 'Could not fetch events.')
			}
			const events = await response.json()
			setLoadedEvents(events)
		}
		fetchEvents()
	}, [])

	return (
		<ul className='events'>
			{loadedEvents.map(event => (
				<EventItem key={event.id} event={event} />
			))}
		</ul>
	)
}
