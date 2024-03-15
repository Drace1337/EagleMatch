import { useLoaderData, json } from 'react-router-dom'
import Teams from '../components/Teams.jsx'
import { getAuthToken } from '../util/auth.js'

export default function TeamList() {
	const data = useLoaderData()

	const teams = data.teams

	return (
		<>
			<h1>Drużyny</h1>
			<Teams teams={teams} />
		</>
	)
}

export async function loader() {
	const response = await fetch('http://localhost:3001/team/teams', {
		headers: {
			Authorization: 'Bearer ' + getAuthToken(),
		},
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować drużyn' }, { status: 500 })
	} else {
		return response
	}
}
