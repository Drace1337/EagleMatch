
import { Form, useNavigation, useNavigate } from 'react-router-dom'
import classes from './Form.module.scss'

function ForumForm() {
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'
	const navigate = useNavigate()
	function cancelHandler() {
		navigate('/forum')
	}

	return (
		<div className={classes.content}>
			<h2>Stwórz Post</h2>
			<Form method='post' className={classes.form}>
				<p>
					<label htmlFor='title'>Tytuł</label>
					<input id='title' type='name' name='title' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='content'>Opis</label>
					<textarea id='content' name='content' required />
				</p>
				<div className={classes.form__actions}>
					<button type='button' onClick={cancelHandler} disabled={isSubmitting}>
						Anuluj
					</button>
					<button disabled={isSubmitting}>{isSubmitting ? 'Tworzenie...' : 'Stwórz post'}</button>
				</div>
			</Form>
		</div>
	)
}

export default ForumForm
