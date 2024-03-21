import { Form, useNavigation } from 'react-router-dom'
import classes from './Form.module.scss'

function Contact() {
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<div className={classes.content}>
			<h2>Formularz kontaktowy</h2>
			<Form method='post' className={classes.form}>
				<p>
					<label htmlFor='email'>Email:</label>
					<input id='email' type='email' name='email' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='topic'>Temat:</label>
					<select name='topic' id='topic' className={classes.form__select}>
						<option value='score'>Wynik meczu</option>
						<option value='problem'>Problem z kontem</option>
						<option value='request'>Podanie o rolę moderatora</option>
						<option value='other'>Inne</option>
					</select>
				</p>
				<p>
					<label htmlFor='message'>Wiadomość:</label>
					<textarea id='message' name='message' required></textarea>
				</p>
				<div className={classes.form__actions}>
					<button disabled={isSubmitting}>{isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}</button>
				</div>
			</Form>
			<div className={classes.contact}>
				<h2>Dodatkowy kontakt</h2>
				<p>
					Facebook: <span>EagleMatch</span>
				</p>
				<p>
					Telefon: <span>799 149 699</span>
				</p>
			</div>
		</div>
	)
}

export default Contact
