import {useState} from 'react';
import Input from './Input.jsx'

export default function ProfileForm(){
        
            const [enteredValues, setEnteredValues] = useState({name: '', email: '', password: '', confirmPassword: ''});
            const [didEdit, setDidEdit] = useState({
                name: false,
                email: false,
                password: false,
                confirmPassword: false
            });
        
            function handleSubmit(event) {
                event.preventDefault();
                console.log(enteredValues.name, enteredValues.email, enteredValues.password, enteredValues.confirmPassword);
            }
        
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
                    <h1>Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <img src="" alt="Profile picture" />
                        <Input label="Name" id="name" type="text" name="name" onBlur={() => handleInputBlur('name')} onChange={(event) => handleInputChange('name', event.target.value)} value={enteredValues.name} error={didEdit.name && !enteredValues.name && <p>Name is required</p>}/>
                        <Input label="Email" id="email" type="email" name="email" onBlur={() => handleInputBlur('email')} onChange={(event) => handleInputChange('email', event.target.value)} value={enteredValues.email} error={didEdit.email && !enteredValues.email && <p>Email is required</p>}/>
                        
                        <button type="submit">Submit</button>
                    </form>
                    <div>
                        <h2>Change password</h2>

                    </div>
                </div>
            )
        }