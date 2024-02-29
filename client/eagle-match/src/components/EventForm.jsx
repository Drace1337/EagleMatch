import {useState} from 'react';
import Input from './Input.jsx'
import Textarea from './Textarea.jsx';
import Dropdown from './Dropdown.jsx';
import { isNotEmpty, hasMinLength } from '../util/validation.js';

export default function EventForm(){
    
        const [enteredValues, setEnteredValues] = useState({name: '', date: '', time: '', description: '', title: '', numberOfParticipants: '', duration: ''});
        const [didEdit, setDidEdit] = useState({
            name: false,
            date: false,
            time: false,
            description: false,
            title: false,
            numberOfParticipants: false,
            duration: false
        });
    
        function handleSubmit(event) {
            event.preventDefault();
            console.log(enteredValues.name, enteredValues.date, enteredValues.time, enteredValues.description);
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
    
        const nameIsInvalid = didEdit.name && isNotEmpty(enteredValues.name) && hasMinLength(enteredValues.name, 3);
        const dateIsInvalid = didEdit.date && isNotEmpty(enteredValues.date);
        const timeIsInvalid = didEdit.time && isNotEmpty(enteredValues.time);
        const descriptionIsInvalid = didEdit.description && isNotEmpty(enteredValues.description) && hasMinLength(enteredValues.description, 3);
        const titleIsInvalid = didEdit.title && isNotEmpty(enteredValues.title) && hasMinLength(enteredValues.title, 3);
        const numberOfParticipantsIsInvalid = didEdit.numberOfParticipants && isNotEmpty(enteredValues.numberOfParticipants);
        const durationIsInvalid = didEdit.time && isNotEmpty(enteredValues.time);

    
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
                <h1>Create Event</h1>
                <form onSubmit={handleSubmit}>
                    <Input label="Title" id="title" type="text" name="title" onBlur={() => handleInputBlur('title')} onChange={(event) => handleInputChange('title', event.target.value)} value={enteredValues.title} error={titleIsInvalid && 'Title must be at least 3 characters long'}/>
                    <Input label="Name" id="name" type="text" name="name" onBlur={() => handleInputBlur('name')} onChange={(event) => handleInputChange('name', event.target.value)} value={enteredValues.name} error={nameIsInvalid && 'Name must be at least 3 characters long'}/>
                    <Input label="Date" id="date" type="date" name="date" onBlur={() => handleInputBlur('date')} onChange={(event) => handleInputChange('date', event.target.value)} value={enteredValues.date} error={dateIsInvalid && 'Please enter a date'}/>
                    <Input label="Time" id="time" type="time" name="time" onBlur={() => handleInputBlur('time')} onChange={(event) => handleInputChange('time', event.target.value)} value={enteredValues.time} error={timeIsInvalid && 'Please enter a time'}/>
                    <Textarea label="Description" id="description" name="description" onBlur={() => handleInputBlur('description')} onChange={(event) => handleInputChange('description', event.target.value)} value={enteredValues.description} error={descriptionIsInvalid && 'Description must be at least 3 characters long'}/>
                    <Dropdown label="Type" id="type" open={open} trigger={<button onClick={handleOpen}>Wybierz typ wydarzenia</button>}
                    menu={[
                    <button onClick={handleMenuClick}>Turniej</button>,
                    <button onClick={handleMenuClick}>Mecz</button>,
                    ]}/>
                    <Dropdown label="Who" id="who" open={open} trigger={<button onClick={handleOpen}>Kto uczestniczy?</button>}
                    menu={[
                    <button onClick={handleMenuClick}>Tylko drużyny</button>,
                    <button onClick={handleMenuClick}>Każdy</button>,
                    ]}/>
                    <Input label="Number of participants" id="numberOfParticipants" type="number" name="numberOfParticipants" onBlur={() => handleInputBlur('numberOfParticipants')} onChange={(event) => handleInputChange('numberOfParticipants', event.target.value)} value={enteredValues.numberOfParticipants} error={numberOfParticipantsIsInvalid && 'Please enter a number'}/>
                    <Input label="Duration" id="duration" type="number" name="duration" onBlur={() => handleInputBlur('duration')} onChange={(event) => handleInputChange('duration', event.target.value)} value={enteredValues.duration} error={durationIsInvalid && 'Please enter a duration of event'}/>
                    <Input label="Confirmation" id="confirmation" type="checkbox" name="confirmation" />
                    <Input label="Privacy" id="privacy" type="checkbox" name="privacy" />
                    <button type="submit" disabled={nameIsInvalid || dateIsInvalid || timeIsInvalid || descriptionIsInvalid}>Create Event</button>
                </form>
            </div>
        );
}