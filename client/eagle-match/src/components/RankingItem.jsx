import { useRouteLoaderData } from 'react-router-dom'
import classes from './RankingItem.module.scss'

export default function RankingItem({ ranking, type }) {
	// ranking.users.forEach(user => {
	// 	console.log(user)
	// })
	console.log(ranking.teams)

	console.log(ranking)
	return (
		<div className={classes.ranking__items}>
			<ul>
				{type === 'goals' &&
					ranking.users.map(user => (
						<li key={user.id}>
							<div>
								<p>
									{user.name} Liczba bramek: {user.goals}
								</p>
							</div>
						</li>
					))}

				{type === 'assists' &&
					ranking.users.map(user => (
						<li key={user.id}>
							<div>
								<p>
									{user.name} Liczba asyst: {user.assists}
								</p>
							</div>
						</li>
					))}
				{type === 'clean-sheets' &&
					ranking.users.map(user => (
						<li key={user.id}>
							<div>
								<p>
									{user.name} Liczba czystych kont: {user.cleanSheets}
								</p>
							</div>
						</li>
					))}
				{type === 'teams' &&
					ranking.teams.map(team => (
						<li key={team.id}>
							<div>
								<p>
									{team.name} Liczba punktów zespołu: {team.points}
								</p>
							</div>
						</li>
					))}
			</ul>
		</div>
	)
}
