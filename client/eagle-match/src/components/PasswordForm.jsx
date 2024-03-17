import { Form, useNavigate, useNavigation } from 'react-router-dom'
import classes from './Form.module.scss'

export default function PasswordForm() {
	const navigation = useNavigation()
	const navigate = useNavigate()
	const id = JSON.parse(localStorage.getItem('userData')).userId

	function cancelHandler() {
		navigate(`/profile/${id}`)
	}
	const isSubmitting = navigation.state === 'submitting'
	return (
		<div className={classes.content}>
			<Form method='put' className={classes.form}>
				<p>
					<label htmlFor='oldpassword'>Stare hasło:</label>
					<input type='password' id='oldpassword' name='oldpassword' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='newpassword'>Nowe hasło:</label>
					<input type='password' id='newpassword' name='newpassword' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='confirmnewpassword'>Potwierdź hasło:</label>
					<input
						type='password'
						id='confirmnewpassword'
						name='confirmnewpassword'
						required
						className={classes.form__input}
					/>
				</p>
				<div className={classes.form__actions}>
					<button type='button' onClick={cancelHandler} disabled={isSubmitting}>
						Anuluj
					</button>
					<button type='submit'>Zmień hasło</button>
				</div>
			</Form>
		</div>
	)
}
