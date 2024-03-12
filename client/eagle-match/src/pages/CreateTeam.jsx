import TeamForm from "../components/TeamForm.jsx";
import {json, redirect} from "react-router-dom";
import { getAuthToken } from '../util/auth'

export default function CreateTeam() {
    return (
        <>
            <TeamForm />
        </>
    )
}

export async function action({ request }) {
	const data = await request.formData()
	console.log(data)

	const teamData = {
		name: data.get('name'),
		logo: data.get('logo'),
        captain: JSON.parse(localStorage.getItem('userData')).userId,
	}
    console.log(JSON.parse(localStorage.getItem('userData')).userId)
	console.log(teamData)

	// if (method === 'PUT') {
	// 	const teamId = params.teamId
	// 	url = 'http://localhost:3001/team/team' + teamId
	// }

	const token = getAuthToken()
	console.log(token)

	const response = await fetch('http://localhost:3001/team/team', {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
			Autorization: 'Bearer ' + token,
		},
		body: teamData,
	})

    console.log(response)
	if (!response.ok) {
		return json({ message: 'Nie udało się utworzyć drużyny' }, { status: 500 })
	}

	return redirect('/')
}