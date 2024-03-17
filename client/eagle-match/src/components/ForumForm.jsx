import { useState } from 'react'
import Input from './Input.jsx'
import Textarea from './Textarea.jsx'
import Button from './UI/Button.jsx'
import { Form, useNavigation, useNavigate } from 'react-router-dom'
import classes from './Form.module.scss'

function ForumForm() {
	// const [enteredValues, setEnteredValues] = useState({ title: '', description: '' })
	// const [didEdit, setDidEdit] = useState({
	// 	title: false,
	// 	description: false,
	// })

	// function handleSubmit(event) {
	// 	event.preventDefault()
	// 	console.log(enteredValues.title, enteredValues.description)
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
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'
	const navigate = useNavigate()
	function cancelHandler() {
		navigate('/forum')
	}

	return (
		<div className={classes.content}>
			<h2>Stwórz Post</h2>
			{/* <form onSubmit={handleSubmit}>
				<Input
					label='Title'
					id='title'
					error={didEdit.title && !enteredValues.title && <p>Title is required</p>}
					onBlur={handleInputBlur.bind(null, 'title')}
					onChange={handleInputChange.bind(null, 'title')}
					value={enteredValues.title}
				/>
				<Textarea
					label='Description'
					id='description'
					error={didEdit.description && !enteredValues.description && <p>Description is required</p>}
					onBlur={handleInputBlur.bind(null, 'description')}
					onChange={handleInputChange.bind(null, 'description')}
					value={enteredValues.description}
				/>
				<Button type='submit'>Submit</Button>
				<Button>Cancel</Button>
			</form> */}
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
