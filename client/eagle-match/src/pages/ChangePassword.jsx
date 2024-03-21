import { json, redirect } from 'react-router-dom'
import PasswordForm from '../components/PasswordForm.jsx'
import { getAuthToken } from '../util/auth.js'

export default function ChangePasswordPage() {
	return (
		<div>
			<h2>Zmiana hasła</h2>
			<PasswordForm />
		</div>
	)
}

export async function action({ request, params }) {
	const data = await request.formData()
	const id = params.id

	const passwordData = {
		oldPassword: data.get('oldpassword'),
		newPassword: data.get('newpassword'),
	}

	const response = await fetch('http://localhost:3001/auth/change-password/' + id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
		body: JSON.stringify(passwordData),
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się zmienić hasła' }, { status: 500 })
	}

	return redirect(`/profile/${id}`)
}
