import { Form, Link, NavLink } from 'react-router-dom'
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
					<li key={user.id}>
						Nazwa: {user.name}
						Rola: {user.role}
						<Form>
							<button type='submit'>Usuń użytkownika</button>
						</Form>
						<Link to='/change-player-info'>Zmień rolę i statystyki</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
