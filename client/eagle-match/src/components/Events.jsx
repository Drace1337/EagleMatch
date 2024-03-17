import { Link } from 'react-router-dom'
import classes from './Events.module.scss'

export default function Events({ events }) {
	console.log(events)
	return (
		<div className={classes.events}>
			<h2>Wszystkie wydarzenia</h2>
			<ul className={classes.events__list}>
				{events
					.filter(event => new Date(event.date).getTime() > new Date().getTime())
					.map(event => (
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
	)
}
