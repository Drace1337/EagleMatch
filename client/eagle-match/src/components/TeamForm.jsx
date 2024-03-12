import { Link, useNavigation, Form, useNavigate } from 'react-router-dom'
import { getAuthToken } from '../util/auth'
import { json, redirect } from 'react-router-dom'

function TeamForm() {
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
		navigate('..')
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
			<Form method='post' encType='multipart/form-data'>
				<p>
					<label htmlFor='name'>Nazwa drużyny:</label>
					<input id='name' type='name' name='name' required />
				</p>
				<p>
					<label htmlFor='logo'>Logo: </label>
					<input type='file' name='logo' id='logo' required  />
				</p>

				<div>
					<button type='button' onClick={cancelHandler} disabled={isSubmitting}>
						Anuluj
					</button>
					<button disabled={isSubmitting}>{isSubmitting ? 'Tworzenie...' : 'Stwórz drużynę'}</button>
				</div>
			</Form>
		</div>
	)
}

export default TeamForm

