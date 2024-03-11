import Users from '../components/Users.jsx'

export default function UserList(){
    const data = useLoaderData()

    const users = data.users

    return (
        <>
            <h1>Users</h1>

            <Users users={users} />
        </>
    )
}

export async function loader() {
    const response = await fetch('http://localhost:3001/users')

    if (!response.ok) {
        return json({ message: 'Nie udało się załadować użytkowników.' }, { status: 500 })
    } else {
        return response
    }
}

export async function action({request, params}) {
    const id = params.userId

    const response = await fetch('http://localhost:3001/user/' + id,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getAuthToken(request),
        },
    })

    if (!response.ok) {
        return json({ message: 'Nie udało się usunąć użytkownika' }, { status: 500 })
    } else {
        return redirect('/users')
    }
}