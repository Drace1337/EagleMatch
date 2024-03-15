import { Link } from 'react-router-dom'
import { Form } from 'react-router-dom'

export default function TeamItem({ team }) {
	console.log(team.members)
	return (
		<article>
			<h2>{team.name}</h2>
			<img src={team.logo} alt='Logo zespołu' />
			<p>Kapitan: {team.captain.name}</p>
			<table>
				<thead>
					<tr>Gracze zespołu:</tr>
				</thead>
				<tbody>
					{team.members.map(member => {
						return (
							<tr>
								<td>{member.name}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<h3>Wydarzenia:</h3>
			<ul>
				{team.events.map(event => {
					return <li>{event}</li>
				})}
			</ul>
			<p>Punkty: {team.points}</p>
			{JSON.parse(localStorage.getItem('userData')).role >= 2 && (
				<>
					<Link to='/users'>Dodaj użytkownika</Link>
					<Form method='delete'>
						<button>Usuń drużynę</button>
					</Form>
					{/* <button>Zaktualizuj dane</button> */}
					{JSON.parse(localStorage.getItem('userData')).role === 4 && <Link to='edit'>Zaktualizuj dane</Link>}
				</>
			)}
		</article>
	)
}
