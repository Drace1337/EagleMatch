import { useEffect, useState } from 'react'
import { useRanking } from '../util/useRanking'
import { json, useLoaderData } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'
import RankingItem from '../components/RankingItem.jsx'

export default function RankingPage() {
	const [selectedType, setSelectedType] = useState('goals')
	const data = useLoaderData()
	console.log(data.users[0].goals)
	console.log(selectedType)
	const ranking = useRanking(selectedType)
	console.log(ranking)
	const loadGoals = () => {
		setSelectedType('goals')
	}

	const loadAssists = () => {
		setSelectedType('assists')
	}

	const loadDefenders = () => {
		setSelectedType('clean-sheets')
	}

	const loadTeams = () => {
		setSelectedType('teams')
	}

	return (
		<>
			<h2>Ranking</h2>
			<div className='ranking__buttons'>
				<button onClick={loadGoals}>Najlepsi strzelcy</button>
				<button onClick={loadAssists}>Najlepsi asystujący</button>
				<button onClick={loadDefenders}>Najlepsi broniący</button>
				<button onClick={loadTeams}>Najlepsze drużyny</button>
			</div>
			<RankingItem ranking={ranking} />
		</>
	)
}

export async function loader({ request }) {
	const response = await fetch('http://localhost:3001/ranking/goals', {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + getAuthToken(request),
		},
	})
	console.log(response)
	if (!response.ok) {
		return json({ message: 'Nie udało się załadować rankingu.' }, { status: 500 })
	} else {
		const ranking = await response.json()
		console.log(ranking)
		return ranking
	}
}
