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

	const response = await fetch('http://localhost:3001/event/' + id)
	if (!response.ok) {
		return json({ message: 'Nie udało się załadować wydarzenia' }, { status: 500 })
	} else {
		return response
	}
}



export default EventPage
