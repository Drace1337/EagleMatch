import UserItem from '../components/UserItem'
import { json, redirect, useLoaderData } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function UserDetail() {
	const user = useLoaderData()
	return (
		<div>
			<h2>Detale użytkownika</h2>
			<UserItem user={user} />
		</div>
	)
}

export async function loader({ params, request }) {
	const id = params.userId

	const response = await fetch('http://localhost:3001/auth/user/' + id, {
		headers: {
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować użytkownika.' }, { status: 500 })
	} else {
		const user = await response.json()
		return user
	}
}

export async function action({ request, params }) {
	const id = params.userId
	const token = JSON.parse(getAuthToken(request)).token
	const teamId = JSON.parse(localStorage.getItem('token')).team
	switch (request.method) {
		case 'DELETE': {
			const response = await fetch('http://localhost:3001/auth/user/' + id, {
				method: request.method,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})

			if (!response.ok) {
				throw json({ message: 'Nie udało się usunąć użytkownika' }, { status: 500 })
			} else {
				return redirect('/users')
			}
		}
		case 'POST': {
			const response = await fetch('http://localhost:3001/team/team/' + teamId + '/user/' + id, {
				method: request.method,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})

			if (!response.ok) {
				throw json({ message: 'Nie udało się dodać użytkownika do drużyny' }, { status: 500 })
			} else {
				return redirect('/users')
			}
		}
	}
}
