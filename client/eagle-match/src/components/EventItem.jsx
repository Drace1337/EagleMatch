import Button from './UI/Button.jsx'
import { useSubmit, useRouteLoaderData, Form } from 'react-router-dom'

export default function EventItem({ event }) {
	const token = useRouteLoaderData('root')
	const role = JSON.parse(localStorage.getItem('userData')).role
	console.log(role)
	

	return (
		<article>
			<h1>{event.title}</h1>
			<time>{event.date}</time>
			<p>{event.description}</p>
			{token && role >= 2 && event.teamOnly && (
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
