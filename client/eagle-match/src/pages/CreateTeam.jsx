import TeamForm from "../components/TeamForm.jsx";
import {json, redirect} from "react-router-dom";

export default function CreateTeam() {
    return (
        <>
            <TeamForm />
        </>
    )
}

export async function action(request){
    const data = request.formData();

    const teamData = {
        name: data.get('name'),
        logo: data.get('logo'),
    }

    const response = await fetch('https://localhost:3001/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
    })

    if (!response.ok) {
        return json({ message: 'Nie udało się utworzyć drużyny' }, { status: 500 });
    }

    return redirect('/');
}