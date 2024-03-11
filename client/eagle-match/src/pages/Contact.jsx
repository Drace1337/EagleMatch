import ContactForm from '../components/ContactForm.jsx';
import { json, redirect } from 'react-router-dom';

function Contact() {
    return <ContactForm />;
}

export default Contact;

export async function action({request}) {
    const data = await request.formData();

    const contactData = {
        email: data.get('email'),
        topic: data.get('topic'),
        message: data.get('message'),
    };

    const response = await fetch('https://localhost:3001/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        return json({ message: 'Nie udało się wysłać wiadomości' }, { status: 500 });
    }

    return redirect('/');
}