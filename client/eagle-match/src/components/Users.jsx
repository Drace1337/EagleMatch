import { Form, Link, NavLink, useSearchParams, useSubmit } from 'react-router-dom'
import { useState, useMemo } from 'react'

export default function Users({ users }) {
	const role = JSON.parse(localStorage.getItem('userData')).role
	const [query, setQuery] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()

	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			return user.name.toLowerCase().includes(query.toLowerCase())
		})
	}, [users, query])

	const submit = useSubmit()
	function startDeleteHandler(userId) {
		const proceed = window.confirm('Are you sure?')
		setSearchParams('id', userId)
		console.log(userId)
		if (proceed) {
			submit(null, { method: 'delete' })
		}
	}

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
						<button onClick={() => startDeleteHandler(user._id)}>Usuń użytkownika</button>
						<Link to='/change-player-info'>Zmień rolę i statystyki</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
