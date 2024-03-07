import { json, useLoaderData, redirect } from 'react-router-dom'

import Locations from '../components/Locations.jsx'

function LocationList() {
    const data = useLoaderData()
    // if (data.isError) {
    // 	return <p>{data.message}</p>
    // }

    const locations = data.locations

    return (
        <>
            <h1>Locations</h1>

            <Locations locations={locations} />
        </>
    )
}

export default LocationList

export async function loader() {
    const response = await fetch('http://localhost:3001/locations')

    if (!response.ok) {
        return json({ message: 'Nie udało się załadować lokalizacji.' }, { status: 500 })
    } else {
        return response
    }
}