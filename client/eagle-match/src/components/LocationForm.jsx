import { Form, useNavigation } from 'react-router-dom'
import classes from './Form.module.scss'

function LocationForm() {
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<div className={classes.content}>
			<h2>Kreator lokalizacji: </h2>
			<Form method='post' className={classes.form}>
				<p>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' name='name' className={classes.form__input} />
				</p>
				<div className={classes.form__actions}>
					<button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Tworzenie...' : 'Utwórz lokalizację'}
					</button>
				</div>
			</Form>
		</div>
	)
}

export default LocationForm
