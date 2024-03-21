import { Form, Link, useRouteLoaderData } from 'react-router-dom'
import classes from './Locations.module.scss'

export default function Locations({ locations }) {
	const token = useRouteLoaderData('root')

	return (
		<div className={classes.content}>
			{token && JSON.parse(token).role === 4 && (
				<Link to='create-location' className={classes.content__link}>
					Dodaj lokalizację
				</Link>
			)}
			<ul>
				{locations.map(location => (
					<li key={location._id}>
						<div className={classes.content__list}>
							<h3>{location.name}</h3>
							{token && JSON.parse(token).role === 4 && (
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
