import { Form, useNavigation } from 'react-router-dom'
import classes from './Form.module.scss'

export default function EventForm({ locations }) {
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<div>
			<h2>Stwórz wydarzenie</h2>
			<Form method='post' className={classes.form}>
				<p>
					<label htmlFor='title'>Tytuł</label>
					<input id='title' type='name' name='title' required className={classes.form__input} />
				</p>
				<div className={classes.form__div}>
					<label htmlFor='is_match'>Wydarzenie jest meczem</label>
					<input id='is_match' type='checkbox' name='is_match' />
				</div>
				<div className={classes.form__div}>
					<label htmlFor='team_only'>Wydarzenie jest tylko dla drużyn</label>
					<input id='team_only' type='checkbox' name='team_only' />
				</div>
				<label htmlFor='location'>Lokalizacja:</label>
				<select name='location' id='location'>
					{locations.map(location => (
						<option key={location.id} value={location.id}>
							{location.name}
						</option>
					))}
				</select>
				<p>
					<label htmlFor='date'>Data wydarzenia:</label>
					<input id='date' type='date' name='date' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='duration'>Czas trwania wydarzenia (w godzinach):</label>
					<input id='duration' type='number' name='duration' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='max_participants'>Maksymalna liczba uczestników:</label>
					<input id='max_participants' type='number' name='max_participants' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='description'>Opis wydarzenia:</label>
					<textarea id='description' name='description' required className={classes.form__input} />
				</p>
				<div className={classes.form__div}>
					<label htmlFor='confirmation_required'>Wymagane potwierdzenie uczestnictwa</label>
					<input id='confirmation_required' type='checkbox' name='confirmation_required' />
				</div>
				<div className={classes.form__div}>
					<label htmlFor='is_private'>Wydarzenie jest prywatne</label>
					<input id='is_private' type='checkbox' name='is_private' />
				</div>
				<div className={classes.form__actions}>
					<button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Tworzenie...' : 'Utwórz wydarzenie'}
					</button>
				</div>
			</Form>
		</div>
	)
}
