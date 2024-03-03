import EventForm from '../components/EventForm.jsx'
import { json, redirect } from 'react-router-dom'

export default function CreateEvent() {
	return <EventForm />
}

export async function action(request, params) {
    const data = request.formData()

    const eventData = {
        title: data.get('title'),
        date: data.get('date'),
        location: data.get('location'),
        type: data.get('type'),
        duration: data.get('duration'),
        description: data.get('description'),
        participants: data.get('participants'),
        maxPlayers: data.get('maxPlayers')
    }

    const response = await fetch('https://localhost:8080/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })

    if (!response.ok) {
        return json({ message: 'Nie udało się utworzyć wydarzenia' }, { status: 500 })
    } 

    return redirect('/')
}