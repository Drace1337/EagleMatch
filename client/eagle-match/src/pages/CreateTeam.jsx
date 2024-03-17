import TeamForm from '../components/TeamForm.jsx'
import { json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth'

export default function CreateTeam() {
	return (
		<>
			<TeamForm method='post'/>
		</>
	)
}

// export async function action({ request }) {
// 	const data = await request.formData()
// 	console.log(data.get('logo'))

// 	const teamData = {
// 		name: data.get('name'),
// 		logo: data.get('logo'),
// 		captain: JSON.parse(localStorage.getItem('userData')).userId,
// 	}
// 	// console.log(JSON.parse(localStorage.getItem('userData')).userId)
// 	// console.log(teamData)

// 	// if (method === 'PUT') {
// 	// 	const teamId = params.teamId
// 	// 	url = 'http://localhost:3001/team/team' + teamId
// 	// }
// 	console.log(teamData)

// 	const formData = new FormData()
// 	formData.append('name', teamData.name)
// 	formData.append('logo', teamData.logo)
// 	formData.append('captain', teamData.captain)

// 	const token = getAuthToken()
// 	// console.log(token)

// 	const response = await fetch('http://localhost:3001/team/team', {
// 		method: 'POST',
// 		headers: {
// 			// 'Content-Type': 'multipart/form-data',
// 			Authorization: 'Bearer ' + token,
// 		},
// 		body: formData,
// 	})

// 	console.log(response)
// 	if (!response.ok) {
// 		console.log('siema500')
// 		return json({ message: 'Nie udało się utworzyć drużyny' }, { status: 500 })
// 	}

// 	return redirect('/')
// }
