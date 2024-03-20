import { Link, useSubmit } from 'react-router-dom'
import classes from './UserItem.module.scss'

export default function UserItem({ user }) {
	console.log(user.user)
	const role = JSON.parse(localStorage.getItem('userData')).role
	const team = JSON.parse(localStorage.getItem('userData')).team

	const submit = useSubmit()
	function startDeleteHandler() {
		const proceed = window.confirm('Czy na pewno chcesz usunąć użytkownika?')
		if (proceed) {
			submit(null, { method: 'delete' })
		}
	}
	function startAddHandler() {
		const proceed = window.confirm('Czy na pewno chcesz dodać użytkownika do drużyny?')
		if (proceed) {
			submit(null, { method: 'post' })
		}
	}
	return (
		<article className={classes.user}>
			<div className={classes.user__text}>
				<p>Nazwa: {user.user.name}</p>
				{/* <p>Rola: {user.user.roles}</p> */}
				<p>Gole: {user.user.goals}</p>
				<p>Asysty: {user.user.assists}</p>
				<p>Czyste konta: {user.user.cleanSheets}</p>
			</div>
			<div className={classes.user__buttons}>
				{role === 4 && (
					<div className={classes.user__buttons__admin}>
						<button onClick={startDeleteHandler}>Usuń użytkownika</button>
						<Link to='change-player-info'>Zmień rolę i statystyki</Link>
					</div>
				)}
				{role >= 2 && team && <button onClick={startAddHandler}>Dodaj do drużyny</button>}
			</div>
		</article>
	)
}
