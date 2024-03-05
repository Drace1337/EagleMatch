// import { useParams } from 'react-router-dom'
import EventItem from '../components/EventItem.jsx'
import { useLoaderData, json, redirect } from 'react-router-dom'

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

	const response = await fetch('http://localhost:8080/event/' + id)
	if (!response.ok) {
		return json({ message: 'Nie udało się załadować wydarzenia' }, { status: 500 })
	} else {
		return response
	}
}

export async function action({ params, request }) {
	const eventId = params.eventId
	const response = await fetch('http://localhost:8080/events' + eventId, { method: request.method })

	if (!response.ok) {
		throw json({ message: 'Nie udało się dołączyć do wydarzenia.' }, { status: 500 })
	}
	return redirect('/')
}

export default EventPage
