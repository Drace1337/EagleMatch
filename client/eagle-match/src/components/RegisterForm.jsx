import { useState } from 'react'
import Input from './Input.jsx'
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js'
import { Form, Link, useActionData, useNavigation } from 'react-router-dom'

function RegisterForm() {
	// const [enteredValues, setEnteredValues] = useState({ email: '', password: '', name: ''});
	// const [didEdit, setDidEdit] = useState({
	//     email: false,
	//     password: false,
	//     name: false
	// });

	// function handleSubmit(event) {
	//     event.preventDefault();
	//     console.log(enteredValues.email, enteredValues.password, enteredValues.name);
	// }

	// function handleInputChange(identifier, value) {
	//     setEnteredValues((prevValues) => {
	//         return {
	//             ...prevValues,
	//             [identifier]: value
	//         }
	//     });
	//     setDidEdit((prevDidEdit) => {
	//         return {
	//             ...prevDidEdit,
	//             [identifier]: false
	//         }
	//     });
	// }

	// const emailIsInvalid = didEdit.email && isEmail(enteredValues.email) && isNotEmpty(enteredValues.email);
	// const passwordIsInvalid = didEdit.password && hasMinLength(enteredValues.password, 6) && isNotEmpty(enteredValues.password);
	// const nameIsInvalid = didEdit.name && isNotEmpty(enteredValues.name) && hasMinLength(enteredValues.name, 3);

	// function handleInputBlur(identifier) {
	//     setDidEdit((prevDidEdit) => {
	//         return {
	//             ...prevDidEdit,
	//             [identifier]: true
	//         }
	//     });
	// }

	const data = useActionData()
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		// <div>
		//     <h1>Register</h1>
		//     <form onSubmit={handleSubmit}>
		//         <Input label="Name" id="name" type="text" name="name" onBlur={() => handleInputBlur('name')} onChange={(event) => handleInputChange('name', event.target.value)} value={enteredValues.name} error={nameIsInvalid && 'Nazwa musi zawierać co najmniej 3 znaki'}/>
		//         <Input label="Email" id="email" type="email" name="email" onBlur={() => handleInputBlur('email')} onChange={(event) => handleInputChange('email', event.target.value)} value={enteredValues.email} error={emailIsInvalid && 'Proszę wprowadź poprawny e-mail'}/>
		//         <Input label="Password" id="password" type="password" name="password" onBlur={() => handleInputBlur('password')} onChange={(event) => handleInputChange('password', event.target.value)} value={enteredValues.password}  error={passwordIsInvalid && 'Proszę wprowadź poprawne hasło'}/>
		//         <button type="submit" disabled={emailIsInvalid || passwordIsInvalid}>Register</button>
		//     </form>
		// </div>
		// <Form method='put' className={classes.form}>
		<Form method='put'>
			<h1>Register</h1>
			{data && data.errors && (
				<ul>
					{Object.values(data.errors).map(error => (
						<li key={error}>{error}</li>
					))}
				</ul>
			)}
			{data && data.error && <p>{data.error}</p>}
			<p>
				<label htmlFor='name'>Name</label>
				<input id='name' type='text' name='name' required />
			</p>
			<p>
				<label htmlFor='email'>Email</label>
				<input id='email' type='email' name='email' required />
			</p>
			<p>
				<label htmlFor='password'>Password</label>
				<input id='password' type='password' name='password' required />
			</p>
			{/* <div className={classes.actions}> */}
			<div>
				<button disabled={isSubmitting}>{isSubmitting ? 'Rejestracja...' : 'Zarejestruj się'}</button>
			</div>
		</Form>
	)
}

export default RegisterForm