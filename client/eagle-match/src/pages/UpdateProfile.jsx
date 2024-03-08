import ProfileForm from "../components/ProfileForm";

export default function UpdateProfile() {

    return <ProfileForm />
}

export async function action(request, params) {
    const data = request.formData();
    const id = params.userId

    const profileData = {
        name: data.get('name'),
        avatar: data.get('avatar'),
        email: data.get('email'),
    }

    const response = await fetch('https://localhost:3001/profile' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    })

    if (!response.ok) {
        return json({ message: 'Nie udało się zaktualizować profilu' }, { status: 500 });
    }

    return redirect('/profile');
}