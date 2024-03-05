import RegisterForm from '../components/RegisterForm.jsx'
import { json, redirect } from 'react-router-dom'

function RegisterPage() {
	return <RegisterForm />
}

export async function action({ request }) {
	const data = await request.formData()
	const authData = {
		name: data.get('name'),
		email: data.get('email'),
		password: data.get('password'),
	}

	const response = fetch('http://localhost:3001/auth/register', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(authData),
	})
	if (response.statusCode === 422) {
		return response
	}

	if (!response.ok) {
		throw json({ message: 'Nie udało się zarejestrować.' }, { statusCode: 500 })
	}

	return redirect('/login')
}

export default RegisterPage
