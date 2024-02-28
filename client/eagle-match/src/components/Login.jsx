import {useState} from 'react';
import Input from './Input.jsx'
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';  

export default function Login() {

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredValues, setEnteredValues] = useState({email: '', password: ''});
    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    });

    function handleSubmit(event) {
        event.preventDefault();
        console.log(enteredValues.email, enteredValues.password);
    }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     const { email, password } = event.target.elements;
    //     console.log(email.value, password.value);
    // }

    function handleInputChange(identifier, value) {
        setEnteredValues((prevValues) => {
            return {
                ...prevValues,
                [identifier]: value
            }
        });
        setDidEdit((prevDidEdit) => {
            return {
                ...prevDidEdit,
                [identifier]: false
            }
        });
    }

    const emailIsInvalid = didEdit.email && isEmail(enteredValues.email) && isNotEmpty(enteredValues.email);
    const passwordIsInvalid = didEdit.password && hasMinLength(enteredValues.password, 6) && isNotEmpty(enteredValues.password);


    // function handleEmailChange(event) {
    //     setEnteredEmail(event.target.value);
    // }

    function handleInputBlur(identifier) {
        setDidEdit((prevDidEdit) => {
            return {
                ...prevDidEdit,
                [identifier]: true
            }
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Email" id="email" type="email" name="email" onBlur={() => handleInputBlur('email')} onChange={(event) => handleInputChange('email', event.target.value)} value={enteredValues.email} error={emailIsInvalid && 'Proszę wprowadź poprawny e-mail'}/>
                <Input label="Password" id="password" type="password" name="password" onBlur={() => handleInputBlur('password')} onChange={(event) => handleInputChange('password', event.target.value)} value={enteredValues.password}  error={passwordIsInvalid && 'Proszę wprowadź poprawne e-mail'}/>
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}