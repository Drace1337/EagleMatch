import ProfileStruct from '../components/ProfileStruct'
import { getAuthToken } from '../util/auth'
import { useLoaderData, json } from 'react-router-dom'

export default function ProfilePage() {
	const data = useLoaderData()
	return <ProfileStruct user={data.user} />
}

export async function loader({ request, params }) {
	const id = await params.id

	const response = await fetch('http://localhost:3001/auth/user/' + id,{
        headers: {
            'Authorization': "Bearer " + getAuthToken(request),
        },
    })

	if (!response.ok) {
		return json({ message: 'Nie udało się załadować użytkownika.' }, { status: 500 })
	} else {
		console.log(response)
		return response
	}
}
