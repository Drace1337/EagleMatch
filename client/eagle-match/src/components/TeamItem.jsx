import { Link } from 'react-router-dom'
import { Form } from 'react-router-dom'

export default function TeamItem({ team }) {
	return (
		<article>
			<h2>{team.name}</h2>
			<img src={team.logo} alt='Logo zespołu' />
			<p>Kapitan: {team.captain}</p>
			<table>
				<thead>
					<th>Gracze zespołu:</th>
				</thead>
				<tbody>
					{team.members.map(member => {
						;<tr>
							<td>{member}</td>
						</tr>
					})}
				</tbody>
			</table>
			<h3>Wydarzenia:</h3>
			<ul>
				{team.events.map(event => {
					;<li>{event}</li>
				})}
			</ul>
			<p>Punkty: {team.points}</p>
			{JSON.parse(localStorage.getItem('userData')).role === 'captain' && (
				<>
					<Link to='users'>Dodaj użytkownika</Link>
					<Form method='delete'>
						<button>Usuń drużynę</button>
					</Form>
					{/* <button>Zaktualizuj dane</button> */}
					<Link to='edit'>Zaktualizuj dane</Link>
				</>
			)}
		</article>
	)
}
