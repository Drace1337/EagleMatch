import { NavLink } from 'react-router-dom'

export default function MainNavigation() {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to='/' className={({ isActive }) => (isActive ? classes.active : undefined)} end>
						Home
					</NavLink>
				</li>
				{/* <li>
					<NavLink to='/regulations' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Regulations
					</NavLink>
				</li> */}
				<li>
					<NavLink to='/contact' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Contact
					</NavLink>
				</li>
				{/* <li>
					<NavLink to='/forum' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Forum
					</NavLink>
				</li> */}
				{/* <li>
					<NavLink to='/history' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						History
					</NavLink>
				</li> */}
				<li>
					<NavLink to='/login' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Login
					</NavLink>
				</li>
				<li>
					<NavLink to='/register' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Register
					</NavLink>
				</li>
				<li>
					<NavLink to='/logout' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Logout
					</NavLink>
				</li>
				{/* <li>
					<NavLink to='/profile' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Profile
					</NavLink>
				</li> */}
				{/* <li>
					<NavLink to='/ranking' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Ranking
					</NavLink>
				</li> */}
				<li>
					<NavLink to='/create-event' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Create Event
					</NavLink>
				</li>
				{/* <li>
					<NavLink to='/create-team' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Create Team
					</NavLink>
				</li> */}
				<li>
					<NavLink to='/event/:id' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Event
					</NavLink>
				</li>
				{/* <li>
					<NavLink to='/post/:id' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Post
					</NavLink>
				</li> */}
				{/* <li>
					<NavLink to='/team/:id' className={({ isActive }) => (isActive ? classes.active : undefined)}>
						Team
					</NavLink>
				</li> */}
			</ul>
		</nav>
	)
}
