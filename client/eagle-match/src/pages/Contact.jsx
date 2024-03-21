import ContactForm from '../components/ContactForm.jsx';
import { json, redirect } from 'react-router-dom';

export default function ContactPage() {
    return <ContactForm />;
}



export async function action({request}) {
    const data = await request.formData();

    const contactData = {
        email: data.get('email'),
        topic: data.get('topic'),
        message: data.get('message'),
    };

    const response = await fetch('http://localhost:3001/messages/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        throw json({ message: 'Nie udało się wysłać wiadomości' }, { status: 500 });
    }

    return redirect('/');
}