import {useState} from 'react';
import Input from './Input.jsx'
import Textarea from './Textarea.jsx';

export default function ForumForm(){
    
        const [enteredValues, setEnteredValues] = useState({title: '', description: ''});
        const [didEdit, setDidEdit] = useState({
            title: false,
            description: false,
        });
    
        function handleSubmit(event) {
            event.preventDefault();
            console.log(enteredValues.title, enteredValues.description);
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
            <dialog>
                <h1>Create Post</h1>
                <form onSubmit={handleSubmit}>
                    <Input label="Title" id="title" error={didEdit.title && !enteredValues.title && <p>Title is required</p>} onBlur={handleInputBlur.bind(null, 'title')} onChange={handleInputChange.bind(null, 'title')} value={enteredValues.title} />
                    <Textarea label="Description" id="description" error={didEdit.description && !enteredValues.description && <p>Description is required</p>} onBlur={handleInputBlur.bind(null, 'description')} onChange={handleInputChange.bind(null, 'description')} value={enteredValues.description} />
                    <button type="submit">Submit</button>
                </form>
            </dialog>
        )
    }