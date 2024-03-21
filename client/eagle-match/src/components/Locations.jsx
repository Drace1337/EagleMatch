import { Form } from 'react-router-dom'
import classes from './Locations.module.scss'
import { getAuthToken } from '../util/auth'

export default function Locations({ locations }) {
	const role = JSON.parse(getAuthToken()).role
	const token = JSON.parse(getAuthToken()).token

	return (
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
