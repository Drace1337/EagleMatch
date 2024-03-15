import { useRouteLoaderData } from 'react-router-dom'

export default function RankingItem({ ranking, type }) {
	// ranking.users.forEach(user => {
	// 	console.log(user)
	// })
	console.log(ranking.teams)

	console.log(ranking)
	return (
		<div>
			<ul>
				{type === 'goals' &&
					ranking.users.map(user => (
						<li key={user.id}>
							<div>
								<h3>{user.name}</h3>
								<p>{user.goals}</p>
							</div>
						</li>
					))}

				{type === 'assists' &&
					ranking.users.map(user => (
						<li key={user.id}>
							<div>
								<h3>{user.name}</h3>
								<p>{user.assists}</p>
							</div>
						</li>
					))}
				{type === 'clean-sheets' &&
					ranking.users.map(user => (
						<li key={user.id}>
							<div>
								<h3>{user.name}</h3>
								<p>{user.cleanSheets}</p>
							</div>
						</li>
					))}
				{type === 'teams' &&
					ranking.teams.map(team => (
						<li key={team.id}>
							<div>
								<h3>{team.name}</h3>
								<p>{team.points}</p>
							</div>
						</li>
					))}
			</ul>
		</div>
	)
}
