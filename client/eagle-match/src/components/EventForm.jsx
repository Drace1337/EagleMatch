import { useState } from 'react'
import Input from './Input.jsx'
import Textarea from './Textarea.jsx'
import { isNotEmpty, hasMinLength } from '../util/validation.js'
import { Form, useNavigate, useNavigation } from 'react-router-dom'
import classes from './Form.module.scss'

export default function EventForm({ locations }) {
	// const [enteredValues, setEnteredValues] = useState({
	// 	name: '',
	// 	date: '',
	// 	time: '',
	// 	description: '',
	// 	title: '',
	// 	numberOfParticipants: '',
	// 	duration: '',
	// })
	// const [didEdit, setDidEdit] = useState({
	// 	name: false,
	// 	date: false,
	// 	time: false,
	// 	description: false,
	// 	title: false,
	// 	numberOfParticipants: false,
	// 	duration: false,
	// })

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

	// const nameIsInvalid = didEdit.name && isNotEmpty(enteredValues.name) && hasMinLength(enteredValues.name, 3)
	// const dateIsInvalid = didEdit.date && isNotEmpty(enteredValues.date)
	// const timeIsInvalid = didEdit.time && isNotEmpty(enteredValues.time)
	// const descriptionIsInvalid =
	// 	didEdit.description && isNotEmpty(enteredValues.description) && hasMinLength(enteredValues.description, 3)
	// const titleIsInvalid = didEdit.title && isNotEmpty(enteredValues.title) && hasMinLength(enteredValues.title, 3)
	// const numberOfParticipantsIsInvalid = didEdit.numberOfParticipants && isNotEmpty(enteredValues.numberOfParticipants)
	// const durationIsInvalid = didEdit.time && isNotEmpty(enteredValues.time)

	// function handleInputBlur(identifier) {
	// 	setDidEdit(prevDidEdit => {
	// 		return {
	// 			...prevDidEdit,
	// 			[identifier]: true,
	// 		}
	// 	})
	// }

	// const navigate = useNavigate()
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<div>
			<h2>Stwórz wydarzenie</h2>
			<Form method='post' className={classes.form}>
				<p>
					<label htmlFor='title'>Tytuł</label>
					<input id='title' type='name' name='title' required className={classes.form__input} />
				</p>
				<div className={classes.form__div}>
					<label htmlFor='is_match'>Wydarzenie jest meczem</label>
					<input id='is_match' type='checkbox' name='is_match' />
				</div>
				<div className={classes.form__div}>
					<label htmlFor='team_only'>Wydarzenie jest tylko dla drużyn</label>
					<input id='team_only' type='checkbox' name='team_only' />
				</div>
				<label htmlFor='location'>Lokalizacja:</label>
				<select name='location' id='location'>
					{locations.map(location => (
						<option key={location.id} value={location.id}>
							{location.name}
						</option>
					))}
				</select>
				<p>
					<label htmlFor='date'>Data wydarzenia:</label>
					<input id='date' type='date' name='date' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='duration'>Czas trwania wydarzenia (w godzinach):</label>
					<input id='duration' type='number' name='duration' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='max_participants'>Maksymalna liczba uczestników:</label>
					<input id='max_participants' type='number' name='max_participants' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='description'>Opis wydarzenia:</label>
					<textarea id='description' name='description' required className={classes.form__input} />
				</p>
				<div className={classes.form__div}>
					<label htmlFor='confirmation_required'>Wymagane potwierdzenie uczestnictwa</label>
					<input id='confirmation_required' type='checkbox' name='confirmation_required' />
				</div>
				<div className={classes.form__div}>
					<label htmlFor='is_private'>Wydarzenie jest prywatne</label>
					<input id='is_private' type='checkbox' name='is_private' />
				</div>
				<div className={classes.form__actions}>
					<button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Tworzenie...' : 'Utwórz wydarzenie'}
					</button>
				</div>
			</Form>
			{/* <Form method='post' className={classes.form}>
			<Form method='post'>
				<Input
					label='Title'
					id='title'
					type='text'
					name='title'
					onBlur={() => handleInputBlur('title')}
					onChange={event => handleInputChange('title', event.target.value)}
					value={enteredValues.title}
					error={titleIsInvalid && 'Title must be at least 3 characters long'}
				/>
				<Input
					label='Name'
					id='name'
					type='text'
					name='name'
					onBlur={() => handleInputBlur('name')}
					onChange={event => handleInputChange('name', event.target.value)}
					value={enteredValues.name}
					error={nameIsInvalid && 'Name must be at least 3 characters long'}
				/>
				<Input
					label='Date'
					id='date'
					type='date'
					name='date'
					onBlur={() => handleInputBlur('date')}
					onChange={event => handleInputChange('date', event.target.value)}
					value={enteredValues.date}
					error={dateIsInvalid && 'Please enter a date'}
				/>
				<Input
					label='Time'
					id='time'
					type='time'
					name='time'
					onBlur={() => handleInputBlur('time')}
					onChange={event => handleInputChange('time', event.target.value)}
					value={enteredValues.time}
					error={timeIsInvalid && 'Please enter a time'}
				/>
				<Textarea
					label='Description'
					id='description'
					name='description'
					onBlur={() => handleInputBlur('description')}
					onChange={event => handleInputChange('description', event.target.value)}
					value={enteredValues.description}
					error={descriptionIsInvalid && 'Description must be at least 3 characters long'}
				/>
				<Dropdown
					label='Type'
					id='type'
					open={open}
					trigger={<button onClick={handleOpen}>Wybierz typ wydarzenia</button>}
					menu={[<button onClick={handleMenuClick}>Turniej</button>, <button onClick={handleMenuClick}>Mecz</button>]}
				/>
				<Dropdown
					label='Who'
					id='who'
					open={open}
					trigger={<button onClick={handleOpen}>Kto uczestniczy?</button>}
					menu={[
						<button onClick={handleMenuClick}>Tylko drużyny</button>,
						<button onClick={handleMenuClick}>Każdy</button>,
					]}
				/>
				<Input
					label='Number of participants'
					id='numberOfParticipants'
					type='number'
					name='numberOfParticipants'
					onBlur={() => handleInputBlur('numberOfParticipants')}
					onChange={event => handleInputChange('numberOfParticipants', event.target.value)}
					value={enteredValues.numberOfParticipants}
					error={numberOfParticipantsIsInvalid && 'Please enter a number'}
				/>
				<Input
					label='Duration'
					id='duration'
					type='number'
					name='duration'
					onBlur={() => handleInputBlur('duration')}
					onChange={event => handleInputChange('duration', event.target.value)}
					value={enteredValues.duration}
					error={durationIsInvalid && 'Please enter a duration of event'}
				/>
				<Input label='Confirmation' id='confirmation' type='checkbox' name='confirmation' />
				<Input label='Privacy' id='privacy' type='checkbox' name='privacy' />
				<button
					type='submit'
					// disabled={nameIsInvalid || dateIsInvalid || timeIsInvalid || descriptionIsInvalid}
					disabled={isSubmitting}>
					{isSubmitting ? 'Creating...' : 'Create Event'}
				</button>
			</Form> */}
		</div>
	)
}
