import { useEffect, useState } from 'react'
import { useRanking } from '../util/useRanking'
import { json, useLoaderData } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'
import RankingItem from '../components/RankingItem.jsx'
import classes from './Ranking.module.scss'

export default function RankingPage() {
	const [selectedType, setSelectedType] = useState('')
	const data = useLoaderData()
	
	console.log(selectedType)
	const { ranking, loading } = useRanking(selectedType)
	console.log(ranking)
	useEffect(() => {
		console.log(loading)
	}, [loading])
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
		<div className={classes.ranking}>
			<h2>Ranking</h2>
			<div className={classes.ranking__buttons}>
				<button onClick={loadGoals}>Najlepsi strzelcy</button>
				<button onClick={loadAssists}>Najlepsi asystujący</button>
				<button onClick={loadDefenders}>Najlepsi broniący</button>
				<button onClick={loadTeams}>Najlepsze drużyny</button>
			</div>
			{!loading && ranking && ('users' in ranking || 'teams' in ranking) && (
				<RankingItem ranking={ranking} type={selectedType} />
			)}
		</div>
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
