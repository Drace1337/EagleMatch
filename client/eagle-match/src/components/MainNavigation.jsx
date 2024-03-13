import { NavLink, useRouteLoaderData, Form } from 'react-router-dom'

export default function MainNavigation() {
	const token = useRouteLoaderData('root')
	const role = JSON.parse(localStorage.getItem('userData')).role
	const userId = JSON.parse(localStorage.getItem('userData')).userId

	return (
		<nav>
			<ul>
				<li>
					{/* <NavLink to='/' className={({ isActive }) => (isActive ? classes.active : undefined)} end> */}
					<NavLink to='/' end>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/venues'>Boiska</NavLink>
				</li>
				<li>
					{/* <NavLink to='/contact' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
					<NavLink to='/contact'>Kontakt</NavLink>
				</li>
				{token && (
					<li>
						<NavLink to='/regulations'>Regulamin</NavLink>
					</li>
				)}
				{token && (
					<li>
						{/* <NavLink to='/profile' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to={`/profile/${userId}`}>Profil</NavLink>
					</li>
				)}
				{token && (
					<li>
						{/* <NavLink to='/history' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to={`/profile/${userId}/history`}>Historia</NavLink>
					</li>
				)}
				{token && (
					<li>
						{/* <NavLink to='/forum' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/forum'>Forum</NavLink>
					</li>
				)}
				{token && (
					<li>
						{/* <NavLink to='/ranking' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/ranking'>Ranking</NavLink>
					</li>
				)}
				{token && (
					<li>
						{/* <NavLink to='/create-team' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/create-team'>Stwórz zespół</NavLink>
					</li>
				)}
				{role === 'admin' ||
					(role === 'captain' && (
						<li>
							<NavLink to='/users'>Użytkownicy</NavLink>
						</li>
					))}
				{!token && (
					<li>
						{/* <NavLink to='/login' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/login'>Zaloguj się</NavLink>
					</li>
				)}
				{!token && (
					<li>
						{/* <NavLink to='/register' className={({ isActive }) => (isActive ? classes.active : undefined)}> */}
						<NavLink to='/register'>Rejestracja</NavLink>
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
