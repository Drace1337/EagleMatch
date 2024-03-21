import { useLoaderData, json } from 'react-router-dom'
import Users from '../components/Users.jsx'
import { getAuthToken } from '../util/auth.js'

export default function UserList() {
	const data = useLoaderData()

	const users = data.users

	return (
		<>
			<Users users={users} />
		</>
	)
}

export async function loader() {
	const response = await fetch('http://localhost:3001/auth/users', {
		headers: {
			Authorization: 'Bearer ' + JSON.parse(getAuthToken()).token,
		},
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się załadować użytkowników.' }, { status: 500 })
	} else {
		return response
	}
}

