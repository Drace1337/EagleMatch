import { Link, useSubmit } from 'react-router-dom'

export default function UserItem({ user }) {
	console.log(user.user)

	const submit = useSubmit()
	function startDeleteHandler() {
		const proceed = window.confirm('Are you sure?')
		if (proceed) {
			submit(null, { method: 'delete' })
		}
	}
	return (
		<article>
			<p>Nazwa: {user.user.name}</p>
			<p>Rola: {user.user.roles}</p>

			<button onClick={startDeleteHandler}>Usuń użytkownika</button>
			<Link to='change-player-info'>Zmień rolę i statystyki</Link>
		</article>
	)
}
