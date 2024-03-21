import LocationForm from '../components/LocationForm.jsx'
import { json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

function CreateLocation() {
	return <LocationForm />
}

export async function action({ request }) {
	const data = await request.formData()

	const locationData = {
		name: data.get('name'),
	}

	const response = await fetch('http://localhost:3001/location/location', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
		body: JSON.stringify(locationData),
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się utworzyć lokalizacji' }, { status: 500 })
	}

	return redirect('/')
}

export default CreateLocation
