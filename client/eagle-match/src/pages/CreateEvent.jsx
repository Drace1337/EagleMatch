import EventForm from '../components/EventForm.jsx'
import { json, redirect } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'

function CreateEvent() {
	const data = useLoaderData()
	const locations = data.locations

	return <EventForm locations={locations} />
}

export default CreateEvent

export async function loader() {
	const response = await fetch('http://localhost:3001/location/locations', {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	})
	console.log(response)

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować boisk.' }, { status: 500 })
	} else {
		return response
	}
}

export async function action({ request }) {
	const data = await request.formData()

	const eventData = {
		title: data.get('title'),
		date: data.get('date'),
		location: data.get('location'),
		type: data.get('type'),
		duration: data.get('duration'),
		description: data.get('description'),
		participants: data.get('participants'),
		maxParticipants: data.get('max_participants'),
		creator: localStorage.getItem('userId'),
	}

	const response = await fetch('https://localhost:3001/events', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(eventData),
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się utworzyć wydarzenia' }, { status: 500 })
	}

	return redirect('/')
}
