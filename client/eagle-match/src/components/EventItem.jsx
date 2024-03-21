import { useRouteLoaderData, Form } from 'react-router-dom'
import classes from './EventItem.module.scss'

export default function EventItem({ event }) {
	const token = useRouteLoaderData('root')

	return (
		<div className={classes.event}>
			<h2>{event.title}</h2>
			<div className={classes.event__content}>
				<time>Data wydarzenia: {new Date(event.date).toLocaleDateString()}</time>
				<p>Opis wydarzenia: {event.description}</p>
				<p>Lokalizacja: {event.location}</p>
				{event.teamOnly && <p>Zapisane drużyny:</p>}
				{event.teamOnly && event.teams.map(team => <p>{team.name}</p>)}
				{!event.teamOnly && <p>Zapisani gracze:</p>}
				{!event.teamOnly && event.players.map(player => <p>{player.name}</p>)}
				{token &&
					JSON.parse(localStorage.getItem('token')).role >= 2 &&
					event.teamOnly &&
					JSON.parse(localStorage.getItem('token')).team !== '' && (
						<Form method='patch' className={classes.event__content__form}>
							<button type='submit' name='intent' value='team' className={classes.event__content__form__button}>
								Dołącz jako drużyna
							</button>
						</Form>
					)}
				{token && !event.teamOnly && (
					<Form method='patch' className={classes.event__content__form}>
						<button type='submit' name='intent' value='player' className={classes.event__content__form__button}>
							Dołącz
						</button>
					</Form>
				)}
			</div>
		</div>
	)
}
