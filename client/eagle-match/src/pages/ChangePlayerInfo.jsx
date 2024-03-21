import { useLoaderData, json, redirect } from 'react-router-dom'
import ChangeProfileForm from '../components/ChangeProfileForm.jsx'
import { getAuthToken } from '../util/auth.js'

export default function ChangePlayerInfo() {
	const data = useLoaderData()
	const user = data.user
	return (
		<div>
			<ChangeProfileForm user={user} />
		</div>
	)
}

export async function action({ request, params }) {
	const data = await request.formData()
	const id = params.id

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
			Authorization: 'Bearer ' + JSON.parse(getAuthToken(request)).token,
		},
		body: JSON.stringify(userData),
	})

	if (!response.ok) {
		throw json({ message: 'Nie udało się zaktualizować profilu' }, { status: 500 })
	}

	return redirect('/users')
}
