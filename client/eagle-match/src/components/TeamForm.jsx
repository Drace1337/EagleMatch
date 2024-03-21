import {  useNavigation, Form, useNavigate,  } from 'react-router-dom'
import { getAuthToken } from '../util/auth'
import { json, redirect } from 'react-router-dom'
import classes from './Form.module.scss'

function TeamForm({ method }) {
	
	const navigation = useNavigation()

	const navigate = useNavigate()

	function cancelHandler() {
		navigate('/')
	}

	const isSubmitting = navigation.state === 'submitting'

	return (
		<div className={classes.content}>
			{method === 'post' && <h2>Stwórz drużynę</h2>}
			{method === 'put' && <h2>Aktualizuj drużynę</h2>}
			
			<Form method={method} encType='multipart/form-data' className={classes.form}>
				<p>
					<label htmlFor='name'>Nazwa drużyny:</label>
					<input id='name' type='name' name='name' required className={classes.form__input} />
				</p>
				<p>
					<label htmlFor='logo'>Logo: </label>
					<input type='file' name='logo' id='logo' required className={classes.form__input} />
				</p>

				<div className={classes.form__actions}>
					<button type='button' onClick={cancelHandler} disabled={isSubmitting}>
						Anuluj
					</button>
					{method === 'post' && (
						<button disabled={isSubmitting}>{isSubmitting ? 'Tworzenie...' : 'Stwórz drużynę'}</button>
					)}
					{method === 'put' && (
						<button disabled={isSubmitting}>{isSubmitting ? 'Aktualizowanie...' : 'Aktualizuj drużynę'}</button>
					)}
				</div>
			</Form>
		</div>
	)
}
export async function action({ request, params }) {
	const method = request.method
	const data = await request.formData()
	
	const teamId = params.teamId
	
	switch (method) {
		case 'POST': {
			const teamData = {
				name: data.get('name'),
				logo: data.get('logo'),
				captain: JSON.parse(localStorage.getItem('token')).userId,
			}

			

			const formData = new FormData()
			formData.append('name', teamData.name)
			formData.append('logo', teamData.logo)
			formData.append('captain', teamData.captain)

			const token = JSON.parse(getAuthToken(request)).token
			

			const response = await fetch('http://localhost:3001/team/team', {
				method: method,
				headers: {
					Authorization: 'Bearer ' + token,
				},
				body: formData,
			})

			if (!response.ok) {
				return json({ message: 'Nie udało się utworzyć drużyny' }, { status: 500 })
			}

			return redirect('/')
		}
		case 'PUT': {

			const teamData = {
				name: data.get('name'),
				logo: data.get('logo'),
			}


			const formData = new FormData()
			formData.append('name', teamData.name)
			formData.append('logo', teamData.logo)

			const token = JSON.parse(getAuthToken(request)).token

			const response = await fetch('http://localhost:3001/team/team/' + teamId + '/update', {
				method: method,
				headers: {
					Authorization: 'Bearer ' + token,
				},
				body: formData,
			})


			if (!response.ok) {
				return json({ message: 'Nie udało się zaktualizować drużyny' }, { status: 500 })
			}

			return redirect('/')
		}
	}
}

export default TeamForm
