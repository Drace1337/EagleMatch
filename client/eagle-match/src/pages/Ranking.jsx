import { useEffect, useState } from 'react'
import { useRanking } from '../util/useRanking'
import RankingItem from '../components/RankingItem.jsx'
import classes from './Ranking.module.scss'

export default function RankingPage() {
	const [selectedType, setSelectedType] = useState('')

	const { ranking, loading } = useRanking(selectedType)
	useEffect(() => {}, [loading])
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
