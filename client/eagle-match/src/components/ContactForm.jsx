import {useState} from 'react';
import Input from './Input.jsx'
import Textarea from './Textarea.jsx';
import Dropdown from './Dropdown.jsx';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
import { Form, useNavigation } from 'react-router-dom';

function Contact(){

    // const [enteredValues, setEnteredValues] = useState({email: '', message: ''});
    // const [didEdit, setDidEdit] = useState({
    //     email: false,
    //     message: false,
    // });
    // const [open, setOpen] = useState(false);

    // function handleOpen(){
    //     setOpen(!open);
    // }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     console.log(enteredValues.email, enteredValues.message);
    // }

    // function handleMenuClick(){
    //     console.log('Menu clicked');
    //     setOpen(false);
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
    // const messageIsInvalid = didEdit.message && isNotEmpty(enteredValues.message) && hasMinLength(enteredValues.message, 3);

    // function handleInputBlur(identifier) {
    //     setDidEdit((prevDidEdit) => {
    //         return {
    //             ...prevDidEdit,
    //             [identifier]: true
    //         }
    //     });
    // }
    const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

    return (
        <div>
            <h1>Kontakt</h1>
            {/* <form onSubmit={handleSubmit}>
                <Input label="Email" id="email" type="email" name="email" onBlur={() => handleInputBlur('email')} onChange={(event) => handleInputChange('email', event.target.value)} value={enteredValues.email} error={emailIsInvalid && 'Proszę wprowadź poprawny e-mail'}/>
                <Dropdown label="Topic" id="topic" open={open} trigger={<button onClick={handleOpen}>Dropdown</button>}
                menu={[
                    <button onClick={handleMenuClick}>Option 1</button>,
                    <button onClick={handleMenuClick}>Option 2</button>,
                ]}/>
                <Textarea label="Message" id="message" name="message" required placeholder="Napisz do nas z czym masz problem" onBlur={() => handleInputBlur('message')} onChange={(event) => handleInputChange('message', event.target.value)} value={enteredValues.message} error={messageIsInvalid && 'Wiadomość musi zawierać co najmniej 3 znaki'}/>
                <button type="submit" disabled={emailIsInvalid || messageIsInvalid}>Send</button>
            </form> */}
            <Form method="post">
                <p>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="topic">Temat:</label>
                    <input id="topic" type="text" name="topic" required />
                </p>
                <p>
                    <label htmlFor="message">Wiadomość:</label>
                    <textarea id="message" name="message" required></textarea>
                </p>
                <div>
				<button disabled={isSubmitting}>{isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}</button>
			</div>
            </Form>
        </div>
    );
}

export default Contact;