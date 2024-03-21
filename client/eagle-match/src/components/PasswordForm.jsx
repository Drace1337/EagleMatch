import { Form, useNavigate, useNavigation } from 'react-router-dom'
import classes from './Form.module.scss'
import { isEqualToOtherValue } from '../util/validation'
import { useState } from 'react'

export default function PasswordForm() {
	const navigation = useNavigation()
	const navigate = useNavigate()
	const id = JSON.parse(localStorage.getItem('token')).userId
	function cancelHandler() {
		navigate(`/profile/${id}`)
	}
	const isSubmitting = navigation.state === 'submitting'
	const [enteredValues, setEnteredValues] = useState({ newpassword: '', confirmnewpassword: '' })
	const passwordsNotEqual = isEqualToOtherValue(enteredValues.newpassword, enteredValues.confirmnewpassword)
	const [didEdit, setDidEdit] = useState({
		email: false,
		password: false,
		name: false,
	})

	function handleInputChange(identifier, value) {
		setEnteredValues(prevValues => {
			return {
				...prevValues,
				[identifier]: value,
			}
		})
		setDidEdit(prevDidEdit => {
			return {
				...prevDidEdit,
				[identifier]: false,
			}
		})
	}

	function handleInputBlur(identifier) {
		setDidEdit(prevDidEdit => {
			return {
				...prevDidEdit,
				[identifier]: true,
			}
		})
	}
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
						className={classes.form__input}
						onBlur={() => handleInputBlur('confirmnewpassword')}
						onChange={event => handleInputChange('confirmnewpassword', event.target.value)}
					/>
					{passwordsNotEqual && <p>Hasła nie są takie same</p>}
				</p>
				<div className={classes.form__actions}>
					<button type='button' onClick={cancelHandler} disabled={isSubmitting || passwordsNotEqual}>
						Anuluj
					</button>
					<button type='submit'>Zmień hasło</button>
				</div>
			</Form>
		</div>
	)
}
