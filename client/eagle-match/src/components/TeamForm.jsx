import { Link, useNavigation, Form, useNavigate, useActionData, useLoaderData } from 'react-router-dom'
import { getAuthToken } from '../util/auth'
import { json, redirect } from 'react-router-dom'

function TeamForm({ method }) {
	// const [enteredValues, setEnteredValues] = useState({name: ''});
	// const [didEdit, setDidEdit] = useState({name: false});

	// function handleSubmit(event) {
	//     event.preventDefault();
	//     console.log(enteredValues.name);
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

	// const nameIsInvalid = didEdit.name && enteredValues.name.trim() === '';

	// function handleInputBlur(identifier) {
	//     setDidEdit((prevDidEdit) => {
	//         return {
	//             ...prevDidEdit,
	//             [identifier]: true
	//         }
	//     });
	// }
	const navigation = useNavigation()

	const navigate = useNavigate()

	function cancelHandler() {
		navigate('/')
	}

	const isSubmitting = navigation.state === 'submitting'

	return (
		<div>
			<h1>Create Team</h1>
			{/* <form onSubmit={handleSubmit}>
                <Input
                    label='Team Name'
                    type='text'
                    id='name'
                    value={enteredValues.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    isValid={!nameIsInvalid}
                />
                <Button type='submit'>Create Team</Button>
            </form> */}
			<Form method={method} encType='multipart/form-data'>
				<p>
					<label htmlFor='name'>Nazwa drużyny:</label>
					<input id='name' type='name' name='name' required />
				</p>
				<p>
					<label htmlFor='logo'>Logo: </label>
					<input type='file' name='logo' id='logo' required />
				</p>

				<div>
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
	console.log(params)
	const teamId = params.teamId
	console.log(method)
	console.log(data.get('logo'))
	switch (method) {
		case 'POST': {
			const teamData = {
				name: data.get('name'),
				logo: data.get('logo'),
				captain: JSON.parse(localStorage.getItem('userData')).userId,
			}

			console.log(teamData)

			const formData = new FormData()
			formData.append('name', teamData.name)
			formData.append('logo', teamData.logo)
			formData.append('captain', teamData.captain)

			const token = getAuthToken()
			// console.log(token)

			const response = await fetch('http://localhost:3001/team/team', {
				method: method,
				headers: {
					// 'Content-Type': 'multipart/form-data',
					Authorization: 'Bearer ' + token,
				},
				body: formData,
			})

			console.log(response)
			if (!response.ok) {
				console.log('siema500')
				return json({ message: 'Nie udało się utworzyć drużyny' }, { status: 500 })
			}

			return redirect('/')
		}
		case 'PUT': {
			console.log(method)

			const teamData = {
				name: data.get('name'),
				logo: data.get('logo'),
			}

			console.log(teamData)

			const formData = new FormData()
			formData.append('name', teamData.name)
			formData.append('logo', teamData.logo)

			const token = getAuthToken()

			const response = await fetch('http://localhost:3001/team/team/' + teamId + '/update', {
				method: method,
				headers: {
					Authorization: 'Bearer ' + token,
				},
				body: formData,
			})

			console.log(response)
			if (!response.ok) {
				console.log('siema500')
				return json({ message: 'Nie udało się zaktualizować drużyny' }, { status: 500 })
			}

			return redirect('/')
		}
	}
}

export default TeamForm
