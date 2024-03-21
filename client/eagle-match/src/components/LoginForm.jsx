import { Form, useActionData, useNavigation } from 'react-router-dom'

import classes from './AuthForm.module.scss'

function Login() {
	const data = useActionData()
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<Form method='post' className={classes.form}>
			<h2>Zaloguj się</h2>
			{data && data.errors && (
				<ul>
					{Object.values(data.errors).map(error => (
						<li key={error}>{error}</li>
					))}
				</ul>
			)}
			{data && data.error && <p>{data.error}</p>}
			<p>
				<label htmlFor='email'>Email</label>
				<input id='email' type='email' name='email' className={classes.form__input} required />
			</p>
			<p>
				<label htmlFor='password'>Password</label>
				<input id='password' type='password' name='password' className={classes.form__input} required />
			</p>
			<div className={classes.actions}>
				<button disabled={isSubmitting}>{isSubmitting ? 'Logowanie...' : 'Zaloguj się'}</button>
			</div>
		</Form>
	)
}

export default Login
