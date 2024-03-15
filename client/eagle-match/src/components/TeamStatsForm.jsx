import { useNavigation } from 'react-router-dom'
import { Form } from 'react-router-dom'

export default function TeamStatsForm({ team }) {
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'
    console.log(team)

	return (
		<div>
			<Form method='patch'>
				<p>
					<label htmlFor='points'>Punkty</label>
					<input type='number' name='points' id='points' required defaultValue={team.points} />
				</p>
				<div>
					<button disabled={isSubmitting}>{isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany'}</button>
				</div>
			</Form>
		</div>
	)
}
