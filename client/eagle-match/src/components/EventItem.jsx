import Button from './UI/Button.jsx'
import { useSubmit, useRouteLoaderData, Form } from 'react-router-dom'

export default function EventItem({ event }) {
	const token = useRouteLoaderData('root')
	const role = localStorage.getItem('role')

	return (
		<article>
			<img src={event.image} alt={event.title} />
			<h1>{event.title}</h1>
			<time>{event.date}</time>
			<p>{event.description}</p>

			<Form method='patch'>
				{token && role === 'captain' && <button>Dołącz jako drużyna</button>}
				{token && <button>Join</button>}
			</Form>
		</article>
	)
}
