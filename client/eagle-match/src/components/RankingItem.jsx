import { useRouteLoaderData } from 'react-router-dom'

export default function RankingItem({ ranking }) {
	// ranking.users.forEach(user => {
	// 	console.log(user)
	// })
	console.log(ranking.users)

	return (
		<div>
			<ul>
				{/* {ranking.type === 'goals' &&
					user.map(user => (
						<li key={user.id}>
							<div>
								<h3>{user.name}</h3>
								<p>{user.goals}</p>
							</div>
						</li>
					))}

				{ranking.type === 'assists' &&
					user.map(user => (
						<li key={user.id}>
							<div>
								<h3>{user.name}</h3>
								<p>{user.assists}</p>
							</div>
						</li>
					))}
				{ranking.type === 'clean-sheets' &&
					user.map(user => (
						<li key={user.id}>
							<div>
								<h3>{user.name}</h3>
								<p>{user.cleanSheets}</p>
							</div>
						</li>
					))} */}
				{/* {ranking.type === 'teams' &&
					team.map(team => (
						<li key={team.id}>
							<div>
								<h3>{team.name}</h3>
								<p>{team.points}</p>
							</div>
						</li>
					))} */}
			</ul>
		</div>
	)
}
