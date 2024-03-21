import { NavLink, useRouteLoaderData, Form } from 'react-router-dom'
import classes from './MainNav.module.scss'

export default function AdminNavigation() {
	const token = useRouteLoaderData('root')
	const role = JSON.parse(token).role
	const validToken = JSON.parse(token).token
	const userId = JSON.parse(token).userId

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

				{validToken && (
					<li>
						<NavLink className={({ isActive }) => (isActive ? classes.active : undefined)} to={`/profile/${userId}`}>
							Profil
						</NavLink>
					</li>
				)}
				{validToken && role >= 4 && (
					<li>
						<NavLink to='/messages' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Wiadomości
						</NavLink>
					</li>
				)}
				{validToken && (
					<li>
						<NavLink to='/forum' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Forum
						</NavLink>
					</li>
				)}
				{validToken && (
					<li>
						<NavLink to='/ranking' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Ranking
						</NavLink>
					</li>
				)}
				{validToken && (
					<li>
						<NavLink to='/create-team' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Stwórz zespół
						</NavLink>
					</li>
				)}
				{validToken && role >= 2 && (
					<li>
						<NavLink to='/users' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Użytkownicy
						</NavLink>
					</li>
				)}
				{validToken && role >= 4 && (
					<li>
						<NavLink to='/teams' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Drużyny
						</NavLink>
					</li>
				)}
				{!validToken && (
					<li>
						<NavLink
							to='/login'
							className={`${({ isActive }) => (isActive ? classes.active : undefined)} ${classes.nav__list__login}`}>
							Zaloguj się
						</NavLink>
					</li>
				)}
				{!validToken && (
					<li>
						<NavLink to='/register' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Rejestracja
						</NavLink>
					</li>
				)}
				{validToken && (
					<li>
						<Form action='/logout' method='post'>
							<button>Wyloguj się</button>
						</Form>
					</li>
				)}
			</ul>
		</nav>
	)
}
