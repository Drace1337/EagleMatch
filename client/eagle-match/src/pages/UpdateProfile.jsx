import ProfileForm from '../components/ProfileForm'
import {  json, redirect, useLoaderData } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function UpdateProfile() {
	const data = useLoaderData()
	const user = data.user

	return <ProfileForm user={user} />
}

export async function action({ request, params }) {
	const data = await request.formData()
	const id = params.id

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
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
		body: formData,
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się zaktualizować profilu' }, { status: 500 })
	}

	return redirect(`/profile/${id}`)
}
