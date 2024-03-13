import { Form, Link, NavLink, useSearchParams, useSubmit } from 'react-router-dom'
import { useState, useMemo } from 'react'

export default function Users({ users }) {
	const role = JSON.parse(localStorage.getItem('userData')).role
	const [query, setQuery] = useState('')


	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			return user.name.toLowerCase().includes(query.toLowerCase())
		})
	}, [users, query])



	return (
		<div>
			<p>
				Wyszukaj użytkownika:
				<input value={query} onChange={e => setQuery(e.target.value)} type='search' id='search' name='search' />
			</p>
			<ul>
				{filteredUsers.map(user => (
					<li key={user._id}>
						Nazwa: {user.name}
						Rola: {user.role}
						{/* <button onClick={() => startDeleteHandler(user._id)}>Usuń użytkownika</button>
						<Link to='/change-player-info'>Zmień rolę i statystyki</Link> */}
						<Link to={`/users/${user._id}`}>Zobacz profil</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
