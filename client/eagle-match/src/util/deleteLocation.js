import { json, redirect } from 'react-router-dom'
import { getAuthToken } from './auth.js'

export async function action({ request, params }) {
	const id = params.locationId
	const response = await fetch('http://localhost:3001/location/location/' + id, {
		method: request.method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się usunąć lokalizacji' }, { status: 500 })
	} else {
		return redirect('/venues')
	}
}
