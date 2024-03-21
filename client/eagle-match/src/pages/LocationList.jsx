import { json, useLoaderData } from 'react-router-dom'

import Locations from '../components/Locations.jsx'
import classes from '../components/PageContent.module.scss'

function LocationList() {
	const data = useLoaderData()
	const locations = data.locations

	return (
		<div className={classes.content}>
			<h2>Lokalizacje</h2>
			
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
