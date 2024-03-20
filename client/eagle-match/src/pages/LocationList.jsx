import { json, useLoaderData, redirect, Link } from 'react-router-dom'

import Locations from '../components/Locations.jsx'
import { getAuthToken } from '../util/auth.js'
import classes from '../components/PageContent.module.scss'

function LocationList() {
	const data = useLoaderData()
	// if (data.isError) {
	// 	return <p>{data.message}</p>
	// }
	const role = JSON.parse(localStorage.getItem('userData')).role
	const token = getAuthToken()
	console.log(role)

	const locations = data.locations

	return (
		<div className={classes.content}>
			<h2>Lokalizacje</h2>
			{token && role === 4 && (
				<Link to='create-location' className={classes.content__link}>
					Dodaj lokalizację
				</Link>
			)}
			<Locations locations={locations} />
		</div>
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
