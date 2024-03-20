import { NavLink, useRouteLoaderData, Form } from 'react-router-dom'
import classes from './MainNav.module.scss'

export default function MainNavigation() {
	const token = useRouteLoaderData('root')
	const role = JSON.parse(localStorage.getItem('userData')).role
	const userId = JSON.parse(localStorage.getItem('userData')).userId

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
					{/* <NavLink to='/contact' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
					<NavLink to='/contact' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Kontakt
					</NavLink>
				</li>

				<li>
					<NavLink to='/regulations' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Regulamin
					</NavLink>
				</li>

				{token && (
					<li>
						{/* <NavLink to='/profile' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink className={({ isActive }) => (isActive ? classes.active : undefined)} to={`/profile/${userId}`}>
							Profil
						</NavLink>
					</li>
				)}
				{token && role >= 4 && (
					<li>
						<NavLink to='/messages' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Wiadomości
						</NavLink>
					</li>
				)}
				{token && (
					<li>
						{/* <NavLink to='/forum' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/forum' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Forum
						</NavLink>
					</li>
				)}
				{token && (
					<li>
						{/* <NavLink to='/ranking' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/ranking' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Ranking
						</NavLink>
					</li>
				)}
				{token && (
					<li>
						{/* <NavLink to='/create-team' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/create-team' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Stwórz zespół
						</NavLink>
					</li>
				)}
				{token && role >= 2 && (
					<li>
						<NavLink to='/users' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Użytkownicy
						</NavLink>
					</li>
				)}
				{token && role >= 4 && (
					<li>
						<NavLink to='/teams' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Drużyny
						</NavLink>
					</li>
				)}
				{!token && (
					<li>
						{/* <NavLink to='/login' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink
							to='/login'
							className={`${({ isActive }) => (isActive ? classes.active : undefined)} ${classes.nav__list__login}`}>
							Zaloguj się
						</NavLink>
					</li>
				)}
				{!token && (
					<li>
						{/* <NavLink to='/register' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/register' className={({ isActive }) => (isActive ? classes.active : undefined)}>
							Rejestracja
						</NavLink>
					</li>
				)}
				{token && (
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
