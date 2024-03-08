import { getAuthToken } from '../utils/auth'

export default function ProfilePage(){
    return(
        <div>
            <h2>Witaj {user.name}!</h2>
            <img src={user.avatar} alt="avatar" />
            <p>Twój email: {user.email}</p>
            <Link to="/edit-profile">Edytuj profil</Link>
            <Link to="/change-password">Zmień hasło</Link>
            <p>Twój zespół: {user.team}</p>
            <p>Twoje role: {user.roles}</p>
            <p>Twoje wydarzenia: </p>
            <ul>
                {user.events.map((event) => (
                    <li key={event.id}>
                        <Link to={event.id}>
                            <div>
                                <h3>{event.title}</h3>
                                <time>{event.date}</time>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

export async function loader({request, params}){
    const id = params.userId

    const response = await fetch('http://localhost:3001/user' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken(request),
        },
    })

    if (!response.ok){
        return json({message: 'Nie udało się załadować użytkownika.'}, {status: 500})
    } else {
        return response
    }
}