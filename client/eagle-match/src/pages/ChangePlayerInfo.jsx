export default function ChangePlayerInfo() {
    const user = useRouteLoaderData('profile');

    return (
        <div>
        <h1>Change player info</h1>
        <ChangeProfileForm user={user} />
        </div>
    );
}

export async function action({request, params}) {

    const data = await request.formData();
    const id = params.userId

    const userData = {
        role: data.get('role'),
        goals: data.get('goals'),
        assists: data.get('assists'),
        cleanSheets: data.get('clean-sheets'),
    }

    const response = await fetch('https://localhost:3001/user' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })

    if (!response.ok) {
        return json({ message: 'Nie udało się zaktualizować profilu' }, { status: 500 });
    }

    return redirect('/users');

}