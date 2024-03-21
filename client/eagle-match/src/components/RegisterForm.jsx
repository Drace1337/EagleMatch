import { Form, Link, useActionData, useNavigation } from 'react-router-dom'

import classes from './AuthForm.module.scss'

function RegisterForm() {
	const data = useActionData()
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<Form method='put' className={classes.form}>
			<h2>Zarejestruj się</h2>
			{data && data.errors && (
				<ul>
					{Object.values(data.errors).map(error => (
						<li key={error}>{error}</li>
					))}
				</ul>
			)}
			{data && data.error && <p>{data.error}</p>}
			<p>
				<label htmlFor='name'>Nazwa</label>
				<input id='name' type='text' name='name' className={classes.form__input} required />
			</p>
			<p>
				<label htmlFor='email'>Email</label>
				<input id='email' type='email' name='email' className={classes.form__input} required />
			</p>
			<p>
				<label htmlFor='password'>Hasło</label>
				<input id='password' type='password' name='password' className={classes.form__input} required minLength={5} />
			</p>
			<p>
				<label htmlFor='regulations'>
					Zaakceptuj <Link to='/regulations'>regulamin</Link>
				</label>
				<input id='regulations' name='regulations' type='checkbox' required />
			</p>
			<div className={classes.actions}>
				<button disabled={isSubmitting}>{isSubmitting ? 'Rejestracja...' : 'Zarejestruj się'}</button>
			</div>
		</Form>
	)
}

export default RegisterForm
