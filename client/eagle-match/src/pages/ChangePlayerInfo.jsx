import { useLoaderData, json, redirect } from 'react-router-dom'
import ChangeProfileForm from '../components/ChangeProfileForm.jsx'
import { getAuthToken } from '../util/auth.js'

export default function ChangePlayerInfo() {
	const data = useLoaderData()
	const user = data.user
	return (
		<div>
			<h1>Change player info</h1>
			<ChangeProfileForm user={user} />
		</div>
	)
}

export async function action({ request, params }) {
	const data = await request.formData()
	const id = params.id
	console.log(id)

	const userData = {
		role: data.get('role'),
		goals: data.get('goals'),
		assists: data.get('assists'),
		cleanSheets: data.get('clean-sheets'),
	}

	const response = await fetch('http://localhost:3001/auth/user/' + id + '/stats', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getAuthToken(request),
		},
		body: JSON.stringify(userData),
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się zaktualizować profilu' }, { status: 500 })
	}

	return redirect('/users')
}
