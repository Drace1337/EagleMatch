import { useEffect, useState } from 'react'
import { useRanking } from '../util/useRanking'
import { json } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

export default function RankingPage() {
	const [selectedType, setSelectedType] = useState('')

	const ranking = useRanking(selectedType)

	useEffect(() => {
		console.log(ranking)
	}, [ranking])

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
		</>
	)
}

export async function loader(request) {
	const response = await fetch('http://localhost:3001/ranking/goals', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + getAuthToken(request),
		},
	})

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować rankingu.' }, { status: 500 })
	} else {
		return response
	}
}
