import { Link, useSubmit } from 'react-router-dom'

export default function UserItem({ user }) {
	console.log(user.user)
	const role = JSON.parse(localStorage.getItem('userData')).role

	const submit = useSubmit()
	function startDeleteHandler() {
		const proceed = window.confirm('Are you sure?')
		if (proceed) {
			submit(null, { method: 'delete' })
		}
	}
	function startAddHandler() {
		const proceed = window.confirm('Are you sure?')
		if (proceed) {
			submit(null, { method: 'post' })
		}
	}
	return (
		<article>
			<p>Nazwa: {user.user.name}</p>
			<p>Rola: {user.user.roles}</p>
			{role === 4 && (
				<>
					<button onClick={startDeleteHandler}>Usuń użytkownika</button>
					<Link to='change-player-info'>Zmień rolę i statystyki</Link>
				</>
			)}
			{role == 2 && <button onClick={startAddHandler}>Dodaj do drużyny</button>}
		</article>
	)
}
