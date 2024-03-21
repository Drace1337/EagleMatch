import { json, redirect } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'

function LoginPage() {
	return <LoginForm />
}

export default LoginPage

export async function action({ request }) {
	const data = await request.formData()
	const authData = {
		email: data.get('email'),
		password: data.get('password'),
	}
	
	const response = await fetch('http://localhost:3001/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(authData),
	})
	
	if (response.statusCode === 401) {
		return response
	}
	
	if (!response.ok) {
		throw json({ message: 'Nie udało się zalogować.' }, { statusCode: 500 })
	}
	
    const resData = await response.json()
    const token = resData.token
	const userId = resData.userId
	const role = resData.role
	const team = resData.team

	localStorage.setItem('token', JSON.stringify({token: token, userId: userId, role: role, team: team}))
    
	const expiration  = new Date()
	expiration.setHours(expiration.getHours() + 1)
	localStorage.setItem('expiration', expiration.toISOString())

	return redirect('/')
}
