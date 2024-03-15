import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

export default function Teams({ teams }) {
	const [query, setQuery] = useState('')

	const filteredTeams = useMemo(() => {
		return teams.filter(team => {
			return team.name.toLowerCase().includes(query.toLowerCase())
		})
	}, [teams, query])

	return (
		<div>
			<p>
				Wyszukaj drużynę:
				<input value={query} onChange={e => setQuery(e.target.value)} type='search' id='search' name='search' />
			</p>
			<ul>
				{filteredTeams.map(team => (
					<li key={team._id}>
						Nazwa: {team.name}
						<Link to={`/team/${team._id}`}>Zobacz zespół</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
