import { Form, Link, NavLink, useSearchParams, useSubmit } from 'react-router-dom'
import { useState, useMemo } from 'react'
import classes from './Users.module.scss'

export default function Users({ users }) {
	const [query, setQuery] = useState('')

	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			return user.name.toLowerCase().includes(query.toLowerCase())
		})
	}, [users, query])

	return (
		<div className={classes.users}>
			<h2>Użytkownicy</h2>
			<p>
				Wyszukaj użytkownika:
				<input value={query} onChange={e => setQuery(e.target.value)} type='search' id='search' name='search' />
			</p>
			<ul className={classes.users__list}>
				{filteredUsers.map(user => (
					<li key={user._id} className={classes.users__list__item}>
						<div className={classes.users__list__item__text}>
							<p>Nazwa: {user.name}</p>
						</div>
						<div className={classes.users__list__item__link}>
							<Link to={`/users/${user._id}`}>Zobacz profil</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
