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
