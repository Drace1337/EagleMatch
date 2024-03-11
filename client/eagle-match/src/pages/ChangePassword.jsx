export default function ChangePasswordPage(){
    return (
        <div>
            <h2>Zmiana hasła</h2>
            <PasswordForm />
        </div>
    );
}

export async function action({request, params}) {
    const data = await request.formData();
    const id = params.userId

    const passwordData = {
        oldPassword: data.get('oldPassword'),
        newPassword: data.get('newPassword'),
    }

    const response = await fetch('https://localhost:3001/password' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
    })

    if (!response.ok) {
        return json({ message: 'Nie udało się zmienić hasła' }, { status: 500 });
    }

    return redirect('/profile');
}