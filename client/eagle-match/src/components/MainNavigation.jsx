import { NavLink } from 'react-router-dom'
import classes from './MainNav.module.scss'

export default function MainNavigation() {

	return (
		<nav className={classes.nav}>
			<ul className={classes.nav__list}>
				<li>
					<NavLink to='/' className={({ isActive }) => (isActive ? classes.active : undefined)} end>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/venues' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Boiska
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Kontakt
					</NavLink>
				</li>

				<li>
					<NavLink to='/regulations' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Regulamin
					</NavLink>
				</li>

				<li>
					<NavLink
						to='/login'
						className={`${({ isActive }) => (isActive ? classes.active : undefined)} ${classes.nav__list__login}`}>
						Zaloguj się
					</NavLink>
				</li>

				<li>
					<NavLink to='/register' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Rejestracja
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
