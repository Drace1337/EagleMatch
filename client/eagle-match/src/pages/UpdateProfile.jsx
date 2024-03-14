import ProfileForm from '../components/ProfileForm'
import { useRouteLoaderData, json, redirect, useLoaderData } from 'react-router-dom'

export default function UpdateProfile() {
	const data = useLoaderData()
	const user = data.user
	// console.log(user)

	return <ProfileForm user={user} />
}

export async function action({ request, params }) {
	const data = request.formData()
	const id = params.userId

	const profileData = {
		name: data.get('name'),
		avatar: data.get('avatar'),
		email: data.get('email'),
	}

	const response = await fetch('http://localhost:3001/auth/user' + id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(profileData),
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się zaktualizować profilu' }, { status: 500 })
	}

	return redirect('/profile')
}
