import EventForm from '../components/EventForm.jsx'
import { json, redirect } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function CreateEventPage() {
	const data = useLoaderData()
	const locations = data.locations

	return <EventForm locations={locations} />
}

export async function loader() {
	const response = await fetch('http://localhost:3001/location/locations', {
		headers: {
			Authorization: 'Bearer ' + JSON.parse(getAuthToken()).token,
		},
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się załadować boisk.' }, { status: 500 })
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
		isMatch: data.get('is_match') === 'on' ? true : false,
		teamOnly: data.get('team_only') === 'on' ? true : false,
		duration: data.get('duration'),
		description: data.get('description'),
		maxParticipants: data.get('max_participants'),
		confirmationRequired: data.get('confirmation_required') === 'on' ? true : false,
		isPrivate: data.get('is_private') === 'on' ? true : false,
		creator: JSON.parse(localStorage.getItem('token')).userId,
	}

	const response = await fetch('http://localhost:3001/events/event', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
		body: JSON.stringify(eventData),
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się utworzyć wydarzenia' }, { status: 500 })
	}

	return redirect('/')
}
