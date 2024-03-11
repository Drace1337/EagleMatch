import { useRouteLoaderData } from 'react-router-dom'

export default function RankingItem({ ranking }) {
	const user = useRouteLoaderData('profile')

	return (
		<div>
			<ul>
				{ranking.type === 'goals' &&
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
			</ul>
		</div>
	)
}
