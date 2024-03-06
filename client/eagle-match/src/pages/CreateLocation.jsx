import LocationForm from '../components/LocationForm'
import { json, redirect } from 'react-router-dom'

function CreateLocation() {
	return <LocationForm />
}

export default CreateLocation

export async function action() {
	const data = request.formData()

	const locationData = {
		name: data.get('name'),
	}

	const response = await fetch('https://localhost:3001/location', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(locationData),
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się utworzyć lokalizacji' }, { status: 500 })
	}

	return redirect('/')
}
