import { useState } from 'react'
import Input from './Input.jsx'
import Textarea from './Textarea.jsx'
import Button from './UI/Button.jsx'
import { Form, useNavigation } from 'react-router-dom'

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

	return (
		<div>
			<h1>Create Post</h1>
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
			<Form method='post'>
				<p>
					<label htmlFor='title'>Tytuł</label>
					<input id='title' type='name' name='title' required />
				</p>
				<p>
					<label htmlFor='content'>Opis</label>
					<textarea id='content' name='content' required />
				</p>
				<div>
					<button disabled={isSubmitting}>{isSubmitting ? 'Tworzenie...' : 'Stwórz post'}</button>
				</div>
			</Form>
		</div>
	)
}

export default ForumForm
