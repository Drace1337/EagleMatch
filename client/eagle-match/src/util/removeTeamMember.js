import { json, redirect } from 'react-router-dom'
import { getAuthToken } from './auth.js'

export async function action({ request, params }) {
	const id = params.teamId
	const userId = params.userId

	const response = await fetch('http://localhost:3001/team/team/' + id + '/user/' + userId, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
	})
	if (!response.ok) {
		throw json({ message: 'Nie udało się usunąć użytkownika z drużyny' }, { status: 500 })
	} else {
		return redirect('/team/' + id)
	}
}
