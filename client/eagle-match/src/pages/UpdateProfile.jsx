import ProfileForm from '../components/ProfileForm'
import { useRouteLoaderData, json, redirect, useLoaderData } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function UpdateProfile() {
	const data = useLoaderData()
	const user = data.user
	// console.log(user)

	return <ProfileForm user={user} />
}

export async function action({ request, params }) {
	const data = await request.formData()
	const id = params.id
	console.log(id)

	const profileData = {
		name: data.get('name'),
		avatar: data.get('avatar'),
		email: data.get('email'),
	}

	const formData = new FormData()
	formData.append('name', profileData.name)
	formData.append('avatar', profileData.avatar)
	formData.append('email', profileData.email)

	const response = await fetch('http://localhost:3001/auth/user/' + id, {
		method: 'PATCH',
		headers: {
			Authorization: 'Bearer ' + getAuthToken(request),
		},
		body: formData,
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się zaktualizować profilu' }, { status: 500 })
	}

	return redirect(`/profile/${id}`)
}
