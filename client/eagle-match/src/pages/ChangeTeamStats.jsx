import TeamStatsForm from '../components/TeamStatsForm'
import { useLoaderData, json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function ChangeTeamStats() {
	const data = useLoaderData()
	const team = data.team

	return (
		<div>
			
			<TeamStatsForm team={team} />
		</div>
	)
}

export async function action({ request, params }) {
	const data = await request.formData()
    console.log(params)
	const id = params.teamId
	console.log(id)

	const teamData = {
		points: data.get('points'),
	}

	const response = await fetch('http://localhost:3001/team/team/' + id + '/points', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getAuthToken(request),
		},
		body: JSON.stringify(teamData),
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się zaktualizować statystyk drużyny' }, { status: 500 })
	}

	return redirect('/teams')
}
