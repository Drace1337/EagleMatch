import { NavLink, useRouteLoaderData } from 'react-router-dom'
import classes from './SubNav.module.scss'

export default function EventsNavigation() {
	const token = useRouteLoaderData('root')

	return (
		<nav className={classes.nav}>
			<ul className={classes.nav__list}>
				{/* <li>
					<NavLink to='/'>Wydarzenia</NavLink>
				</li> */}
				{token && (
					<li>
						<NavLink to='/create-event' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Stwórz wydarzenie
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	)
}
