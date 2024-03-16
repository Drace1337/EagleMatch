import { Form } from 'react-router-dom'

export default function Locations({ locations }) {
	console.log(locations._id)
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
		<div>
			<h2>Boiska:</h2>
			<ul>
				{locations.map(location => (
					<li key={location._id}>
						<div>
							<h3>{location.name}</h3>
							<Form method='delete' action={`/venues/${location._id}`}>
								<button>Usuń</button>
							</Form>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
