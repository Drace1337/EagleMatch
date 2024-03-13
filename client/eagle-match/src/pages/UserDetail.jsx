import UserItem from '../components/UserItem'
import { json, redirect, useLoaderData } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function UserDetail() {
	const user = useLoaderData()
	// console.log(user)
	return (
		<div>
			<h1>User Detail</h1>
			<UserItem user={user} />
		</div>
	)
}

export async function loader({ params, request }) {
	const id = params.userId
	// console.log(params)
	// console.log(id)

	const response = await fetch('http://localhost:3001/auth/user/' + id, {
		headers: {
			Authorization: 'Bearer ' + getAuthToken(request),
		},
	})
	// console.log('response', response)

	if (!response.ok) {
		// console.log('siema500')
		return json({ message: 'Nie udało się załadować użytkownika.' }, { status: 500 })
	} else {
		const user = await response.json()
		return user
	}
}

export async function action({ request, params }) {
	const id = params.userId
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
