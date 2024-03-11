import Button from './UI/Button.jsx'
import { useSubmit, useRouteLoaderData, Form } from 'react-router-dom'

export default function EventItem({ event }) {
	const token = useRouteLoaderData('root')
	const role = JSON.parse(localStorage.getItem('userData')).role

	return (
		<article>
			<img src={event.image} alt={event.title} />
			<h1>{event.title}</h1>
			<time>{event.date}</time>
			<p>{event.description}</p>
			{token && role === 'captain' && event.teamOnly &&
			<Form method='patch'>
				{/* {token && role === 'captain' && <button>Dołącz jako drużyna</button>}
				{token && <button>Join</button>} */}
				 <button type="submit" name='intent' value='team'>Dołącz jako drużyna</button>
				
			</Form>}
			{token && !event.teamOnly &&
			<Form method='patch'>
				 <button type="submit" name='intent' value='player'>Dołącz</button>
			</Form>}
		</article>
	)
}
