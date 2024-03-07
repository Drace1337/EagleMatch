import { Link } from "react-router-dom";

export default function Events({ events}) {
	

	return (
		<div >
		  <h2>All Events</h2>
		  <ul >
			{events.map((event) => (
			  <li key={event.id} >
				<Link to={event.id}>
				  <div >
					<h3>{event.title}</h3>
					<time>{event.date}</time>
				  </div>
				</Link>
			  </li>
			))}
		  </ul>
		</div>
	  );
}
