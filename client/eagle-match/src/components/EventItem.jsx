// import Button from "./UI/Button.jsx";
// import { useSubmit } from "react-router-dom";

// export default function EventItem({ event }) {
// 	const submit = useSubmit()

// 	function handleJoinEvent() {
// 		const proceed = window.confirm('Do you want to join this event?')

// 		if (proceed) {
// 			submit({}, {method: 'PATCH'})
// 		}
// 	}

// 	return (
// 		<li key={id} className='event-item'>
// 			<article>
// 				<div>
// 					<h2>{event.title}</h2>
// 					<p>{event.date}</p>
// 					<p>{event.location}</p>
// 					<p>{event.type}</p>
// 					<p>{event.duration}</p>
// 					<p>{event.description}</p>
// 					<p>{event.participants}</p>
// 					<p>{event.maxPlayers}</p>
// 				</div>
//                 <p>
//                     <Button onClick={handleJoinEvent}>Join</Button>
//                 </p>
// 			</article>
// 		</li>
// 	)
// }
