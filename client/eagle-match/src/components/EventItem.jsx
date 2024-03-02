import Button from "./UI/Button.jsx";

export default function EventItem({ event }) {
	return (
		<li key={id} className='event-item'>
			<article>
				<div>
					<h2>{event.title}</h2>
					<p>{event.date}</p>
					<p>{event.location}</p>
					<p>{event.type}</p>
					<p>{event.duration}</p>
					<p>{event.description}</p>
					<p>{event.participants}</p>
					<p>{event.maxPlayers}</p>
				</div>
                <p>
                    <Button>View Details</Button>
                    <Button>Join Event</Button>
                </p>
			</article>
		</li>
	)
}
