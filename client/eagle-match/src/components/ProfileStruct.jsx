import { Link } from 'react-router-dom'

export default function ProfileStruct({ user }) {
	// console.log(user._id)
	return (
		<div>
			<h2>Witaj {user.name}!</h2>
			<img src={user.avatar} alt='avatar' />
			<p>Twój email: {user.email}</p>
			<Link to='edit-profile'>Edytuj profil</Link>
			<Link to='change-password'>Zmień hasło</Link>
			<p>
				Twój zespół: <Link to={`/team/${user.team._id}`}>{user.team.name}</Link>
			</p>
			<p>Twoje role: {user.roles}</p>
			<p>Twoje wydarzenia: </p>
			<ul>
				{user.events.map(event => (
					<li key={event.id}>
						<Link to={event.id}>
							<div>
								<h3>{event.title}</h3>
								<time>{event.date}</time>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
