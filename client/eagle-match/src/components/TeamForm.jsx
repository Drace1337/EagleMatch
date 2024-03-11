import { Link, useNavigation, Form, useNavigate } from 'react-router-dom'
import { getAuthToken } from '../util/auth'
import { json, redirect } from 'react-router-dom'

function TeamForm({method, team}) {
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
            <Form method={method}>
                <p>
                    <label htmlFor='name'>Nazwa drużyny:</label>
                    <input id='name' type='name' name='name' required defaultValue={team ? team.name : ''}/>
                </p>
                <p>
					<label htmlFor='image'>Logo: </label>
					<input type="file" name="image" id="image" required defaultValue={team ? team.logo : ''}/>
				</p>

                <div>
                    <button type="button" onClick={cancelHandler} disabled={isSubmitting}>Anuluj</button>
				    <button disabled={isSubmitting}>{isSubmitting ? 'Tworzenie...' : 'Stwórz drużynę'}</button>
			    </div>
            </Form>
        </div>
    )
}

export default TeamForm;

export async function action({request, params}){
    const method = await request.method;
    const data = request.formData();

    const teamData = {
        name: data.get('name'),
        logo: data.get('logo'),
    }

    let url = 'https://localhost:3001/teams';

    if (method === 'PUT') {
        const teamId = params.teamId;
        url = 'https://localhost:3001/teams/' + teamId;
    }

    const token = getAuthToken()

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Autorization': 'Bearer ' + token,
        },
        body: JSON.stringify(teamData),
    })

    

    if (!response.ok) {
        return json({ message: 'Nie udało się utworzyć drużyny' }, { status: 500 });
    }

    return redirect('/');
}