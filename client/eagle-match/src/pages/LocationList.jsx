import { json, useLoaderData, redirect, Link } from 'react-router-dom'

import Locations from '../components/Locations.jsx'
import { getAuthToken } from '../util/auth.js'

function LocationList() {
	const data = useLoaderData()
	// if (data.isError) {
	// 	return <p>{data.message}</p>
	// }
	const role = JSON.parse(localStorage.getItem('userData')).role
	console.log(role)

	const locations = data.locations

	return (
		<>
			<h1>Locations</h1>
			{role === 4 && <Link to='create-location'>Dodaj lokalizację</Link>}
			<Locations locations={locations} />
		</>
	)
}

export default LocationList

export async function loader() {
	const response = await fetch('http://localhost:3001/location/locations')

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować lokalizacji.' }, { status: 500 })
	} else {
		return response
	}
}

