import Button from './UI/Button.jsx'
import { useSubmit, useRouteLoaderData, Form } from 'react-router-dom'

export default function EventItem({ event }) {
	const token = useRouteLoaderData('root')
	const role = JSON.parse(localStorage.getItem('userData')).role
	const team = JSON.parse(localStorage.getItem('userData')).team
	console.log(role)

	return (
		<article>
			<h1>{event.title}</h1>
			<time>Data wydarzenia: {event.date}</time>
			<p>Opis wydarzenia: {event.description}</p>
			<p>Lokalizacja: {event.location}</p>
			{event.teamOnly && <p>Zapisane drużyny:</p>}
			{event.teamOnly && event.teams.map(team => <p>{team.name}</p>)}
			{!event.teamOnly && <p>Zapisani gracze:</p>}
			{!event.teamOnly && event.players.map(player => <p>{player.name}</p>)}
			{token && role >= 2 && event.teamOnly && team != '' && (
				<Form method='patch'>
					<button type='submit' name='intent' value='team'>
						Dołącz jako drużyna
					</button>
				</Form>
			)}
			{token && !event.teamOnly && (
				<Form method='patch'>
					<button type='submit' name='intent' value='player'>
						Dołącz
					</button>
				</Form>
			)}
		</article>
	)
}
