import { useLoaderData, json, redirect, useActionData } from 'react-router-dom'
import Users from '../components/Users.jsx'
import { getAuthToken } from '../util/auth.js'

export default function UserList() {
	const data = useLoaderData()

	const users = data.users

	return (
		<>
			<h1>Users</h1>

			<Users users={users} />
		</>
	)
}

export async function loader() {
	const response = await fetch('http://localhost:3001/auth/users', {
		headers: {
			Authorization: 'Bearer ' + getAuthToken(),
		},
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować użytkowników.' }, { status: 500 })
	} else {
		return response
	}
}

export async function action({ request, params }) {
	const searchParams = new URL(request.url).searchParams
	console.log(searchParams.get('id'))
	const id = searchParams.get('id')
	console.log(id)
	const token = getAuthToken()

	const response = await fetch('http://localhost:3001/auth/user/' + id, {
		method: request.method,
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się usunąć użytkownika' }, { status: 500 })
	} else {
		return redirect('/users')
	}
}
