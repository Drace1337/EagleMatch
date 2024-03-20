import { Form } from 'react-router-dom'
import classes from './ChangeProfileForm.module.scss'

export default function ChangeProfileForm({ user }) {
	console.log(user)
	return (
		<div className={classes.content}>
			<h2>Zmień statystyki użytkownika</h2>
			<Form method='patch' className={classes.form}>
				<p>
					<label htmlFor='role'>Rola:</label>
					<input type='number' id='role' name='role' defaultValue={user.roles} />
				</p>
				<p>
					<label htmlFor='goals'>Gole:</label>
					<input type='number' id='goals' name='goals' defaultValue={user.goals} />
				</p>
				<p>
					<label htmlFor='assists'>Asysty:</label>
					<input type='number' id='assists' name='assists' defaultValue={user.assists} />
				</p>
				<p>
					<label htmlFor='clean-sheets'>Czyste konta:</label>
					<input type='number' id='clean-sheets' name='clean-sheets' defaultValue={user.cleanSheets} />
				</p>
				<div className={classes.form__actions}>
					<button>Zapisz</button>
				</div>
			</Form>
		</div>
	)
}
