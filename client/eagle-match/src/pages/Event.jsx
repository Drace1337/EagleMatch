// import { useParams } from 'react-router-dom'
import EventItem from '../components/EventItem.jsx'
import { useLoaderData, json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

function EventPage() {
	// const params = useParams()
	const data = useLoaderData()

	return (
		<>
			<EventItem event={data.event} />
		</>
	)
}

export async function loader({ request, params }) {
	const id = params.eventId

	const response = await fetch('http://localhost:3001/events/event/' + id)
	if (!response.ok) {
		return json({ message: 'Nie udało się załadować wydarzenia' }, { status: 500 })
	} else {
		return response
	}
}

export default EventPage

export async function action({ request, params }) {
	const eventId = params.eventId
	const data = await request.formData()
	console.log(data)
	let intent = data.get('intent')
	const team = JSON.parse(localStorage.getItem('userData')).team

	if (intent === 'player') {
		const response = await fetch('http://localhost:3001/events/event/' + eventId + '/player', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getAuthToken(request),
			},
		})
	} else if (intent === 'team') {
		const response = await fetch('http://localhost:3001/events/event/' + eventId + '/team', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getAuthToken(request),
			},
			body: JSON.stringify({ team: team }),
		})
	}
}
