import { Form } from 'react-router-dom'
import classes from './Locations.module.scss'
import { getAuthToken } from '../util/auth'

export default function Locations({ locations }) {
	console.log(locations._id)
	const role = JSON.parse(localStorage.getItem('userData')).role
	const token = getAuthToken()
	return (
		// <table>
		//     <thead>
		//         <th>Boiska:</th>
		//     </thead>
		//     <tbody>
		//         {locations.map((location) => (
		//             <tr key={location.id}>
		//                 <td>{location.name}</td>
		//             </tr>
		//         ))}
		//     </tbody>
		// </table>
		<div className={classes.content}>
			<ul>
				{locations.map(location => (
					<li key={location._id}>
						<div className={classes.content__list}>
							<h3>{location.name}</h3>
							{token && role === 4 && (
								<Form method='delete' action={`/venues/${location._id}`}>
									<button>Usuń</button>
								</Form>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
