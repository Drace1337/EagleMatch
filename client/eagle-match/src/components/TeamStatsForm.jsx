import { useNavigation } from 'react-router-dom'
import { Form } from 'react-router-dom'
import classes from './Form.module.scss'

export default function TeamStatsForm({ team }) {
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	return (
		<div className={classes.content}>
			<h2>Zmień statystyki drużyny</h2>
			<Form method='patch' className={classes.form}>
				<p>
					<label htmlFor='points'>Punkty:</label>
					<input
						type='number'
						name='points'
						id='points'
						required
						defaultValue={team.points}
						className={classes.form__input}
					/>
				</p>
				<div className={classes.form__actions}>
					<button disabled={isSubmitting}>{isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany'}</button>
				</div>
			</Form>
		</div>
	)
}
