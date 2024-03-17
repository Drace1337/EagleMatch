import { Form, Link, NavLink, useSearchParams, useSubmit } from 'react-router-dom'
import { useState, useMemo } from 'react'

export default function Users({ users }) {
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
						<Link to={`/users/${user._id}`}>Zobacz profil</Link>
						
					</li>
				))}
			</ul>
		</div>
	)
}
