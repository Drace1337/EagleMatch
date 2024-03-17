import { Link } from 'react-router-dom'
import { Form } from 'react-router-dom'
import { useSubmit } from 'react-router-dom'

export default function TeamItem({ team }) {
	console.log(team.members)
	const logoPath = `http://localhost:3001/${team.logo}`
	const submit = useSubmit()
	function startDeleteHandler() {
		const proceed = window.confirm('Are you sure?')
		if (proceed) {
			submit(null, { method: 'delete-user' })
		}
	}
	return (
		<article>
			<h2>{team.name}</h2>
			<img src={logoPath} alt='Logo zespołu' />
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
								<td>
									{team.captain._id !== member._id && (
										<Form method='delete-user' action={`/team/${team._id}/${member._id}`}>
											<button>Usuń gracza z drużyny</button>
										</Form>
									)}
								</td>
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
					<Form method='delete-team'>
						<button>Usuń drużynę</button>
					</Form>
					{/* <button>Zaktualizuj dane</button> */}
					{JSON.parse(localStorage.getItem('userData')).role === 4 && <Link to='edit'>Zaktualizuj dane</Link>}
					{team.captain._id === JSON.parse(localStorage.getItem('userData')).userId && (
						<Link to='update'>Zaktualizuj dane</Link>
					)}
				</>
			)}
		</article>
	)
}
