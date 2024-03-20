import { Link } from 'react-router-dom'
import { Form } from 'react-router-dom'
import { useSubmit } from 'react-router-dom'
import classes from './TeamItem.module.scss'

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
			<div className={classes.team}>
				<div className={classes.team__logo}>
					<img src={logoPath} alt='Logo zespołu' />
				</div>
				<div className={classes.team__content}>
					<p>Kapitan: {team.captain.name}</p>
					<p>Punkty: {team.points}</p>
				</div>
			</div>
			<table className={classes.members}>
				<thead className={classes.members__head}>
					<th>Gracze zespołu:</th>
				</thead>
				<tbody>
					{team.members.map(member => {
						return (
							<tr>
								<th className={classes.members__name}>{member.name}</th>
								<td className={classes.members__button}>
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
			{JSON.parse(localStorage.getItem('userData')).role >= 2 && (
				
					<div className={classes.links}>
						{team.captain._id === JSON.parse(localStorage.getItem('userData')).userId && (
							<Link to='/users'>Dodaj użytkownika</Link>
						)}

						<Form method='delete-team'>
							<button>Usuń drużynę</button>
						</Form>
						{/* <button>Zaktualizuj dane</button> */}
						{team.captain._id === JSON.parse(localStorage.getItem('userData')).userId && (
							<Link to='update'>Zaktualizuj dane</Link>
						)}
						{JSON.parse(localStorage.getItem('userData')).role === 4 && <Link to='edit'>Edytuj statystyki</Link>}
					</div>
				
			)}
			<div className={classes.events}>
				<h2>Wydarzenia:</h2>
				<ul className={classes.events__list}>
					{team.events.map(event => (
						<li key={event._id} className={classes.events__list__item}>
							<Link to={`/event/${event._id}`}>
								<div className={classes.events__list__item__content}>
									<h3>{event.title}</h3>
									<time>{new Date(event.date).toLocaleDateString()}</time>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</article>
	)
}
