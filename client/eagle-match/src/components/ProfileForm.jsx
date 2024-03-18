import { useState } from 'react'
import Input from './Input.jsx'
import { Form, useNavigation, useRouteLoaderData, useNavigate } from 'react-router-dom'
import classes from './Form.module.scss'

function ProfileForm({ user }) {
	// const [enteredValues, setEnteredValues] = useState({ name: '', email: '', password: '', confirmPassword: '' })
	// const [didEdit, setDidEdit] = useState({
	// 	name: false,
	// 	email: false,
	// 	password: false,
	// 	confirmPassword: false,
	// })

	// function handleSubmit(event) {
	// 	event.preventDefault()
	// 	console.log(enteredValues.name, enteredValues.email, enteredValues.password, enteredValues.confirmPassword)
	// }

	// function handleInputChange(identifier, value) {
	// 	setEnteredValues(prevValues => {
	// 		return {
	// 			...prevValues,
	// 			[identifier]: value,
	// 		}
	// 	})
	// 	setDidEdit(prevDidEdit => {
	// 		return {
	// 			...prevDidEdit,
	// 			[identifier]: false,
	// 		}
	// 	})
	// }

	// function handleInputBlur(identifier) {
	// 	setDidEdit(prevDidEdit => {
	// 		return {
	// 			...prevDidEdit,
	// 			[identifier]: true,
	// 		}
	// 	})
	// }
	console.log(user)

	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'
	const navigate = useNavigate()
	function cancelHandler() {
		navigate('/profile/' + user._id)
	}

	return (
		<div className={classes.content}>
			<h2>Edytuj profil</h2>
			{/* <form onSubmit={handleSubmit}>
				<img src='' alt='Profile picture' />
				<Input
					label='Name'
					id='name'
					type='text'
					name='name'
					defaultValue={user ? user.name : ''}
					onBlur={() => handleInputBlur('name')}
					onChange={event => handleInputChange('name', event.target.value)}
					value={enteredValues.name}
					error={didEdit.name && !enteredValues.name && <p>Name is required</p>}
				/>
				<Input
					label='Email'
					id='email'
					type='email'
					name='email'
					defaultValue={user ? user.email : ''}
					onBlur={() => handleInputBlur('email')}
					onChange={event => handleInputChange('email', event.target.value)}
					value={enteredValues.email}
					error={didEdit.email && !enteredValues.email && <p>Email is required</p>}
				/>

				<button type='submit'>Submit</button>
			</form>
			<div>
				<h2>Change password</h2>
			</div> */}
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
