import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import classes from './Teams.module.scss'

export default function Teams({ teams }) {
	const [query, setQuery] = useState('')

	const filteredTeams = useMemo(() => {
		return teams.filter(team => {
			return team.name.toLowerCase().includes(query.toLowerCase())
		})
	}, [teams, query])

	return (
		<div className={classes.teams}>
			<h2>Drużyny</h2>
			<p>
				Wyszukaj drużynę:
				<input value={query} onChange={e => setQuery(e.target.value)} type='search' id='search' name='search' />
			</p>
			<ul className={classes.teams__list}>
				{filteredTeams.map(team => (
					<li key={team._id} className={classes.teams__list__item}>
						<div className={classes.teams__list__item__text}>
							<p>Nazwa zespołu: {team.name}</p>
						</div>
						<div className={classes.teams__list__item__link}>
							<Link to={`/team/${team._id}`}>Zobacz zespół</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
