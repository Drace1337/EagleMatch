
import { Form, useNavigation,  useNavigate } from 'react-router-dom'
import classes from './Form.module.scss'

function ProfileForm({ user }) {


	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'
	const navigate = useNavigate()
	function cancelHandler() {
		navigate('/profile/' + user._id)
	}

	return (
		<div className={classes.content}>
			<h2>Edytuj profil</h2>

			<Form method='patch' encType='multipart/form-data' className={classes.form}>
				<p>
					<label htmlFor='name'>Nazwa użytkownika: </label>
					<input id='name' type='name' name='name' required defaultValue={user.name} className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='email'>Email: </label>
					<input
						id='email'
						type='email'
						name='email'
						required
						defaultValue={user.email}
						className={classes.form__input}
					/>
				</p>
				<p>
					<label htmlFor='avatar'>Zdjęcie profilowe: </label>
					<input type='file' name='avatar' id='avatar' required className={classes.form__input} />
				</p>
				<div className={classes.form__actions}>
					<button type='button' onClick={cancelHandler} disabled={isSubmitting}>
						Anuluj
					</button>
					<button disabled={isSubmitting}>{isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany'}</button>
				</div>
			</Form>
		</div>
	)
}

export default ProfileForm
