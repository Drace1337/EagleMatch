import { Form, useNavigation } from 'react-router-dom'

function LocationForm() {
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<div>
			<h1>Location Form</h1>
			<Form method='post'>
				<p>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' name='name' />
				</p>
				<button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Tworzenie...' : 'Utwórz lokalizację'}
				</button>
			</Form>
		</div>
	)
}

export default LocationForm
