import TeamForm from '../components/TeamForm.jsx'

export default function UpdateTeam() {
	return (
		<>
			<TeamForm method='put'/>
		</>
	)
}

// export async function action({request}){
//     const data = await request.formData()
//     console.log(data.get('logo'))

//     const teamData = {
//         name: data.get('name'),
//         logo: data.get('logo'),
//     }
//     // console.log(JSON.parse(localStorage.getItem('userData')).userId)
//     // console.log(teamData)

//     // if (method === 'PUT') {
//     // 	const teamId = params.teamId
//     // 	url = 'http://localhost:3001/team/team' + teamId
//     // }
//     console.log(teamData)

//     const formData = new FormData()
//     formData.append('name', teamData.name)
//     formData.append('logo', teamData.logo)

//     const token = getAuthToken()
//     // console.log(token)

//     const response = await fetch('http://localhost:3001/team/team', {
//         method: 'PUT',
//         headers: {
//             // 'Content-Type': 'multipart/form-data',
//             Authorization: 'Bearer ' + token,
//         },
//         body: formData,
//     })

//     console.log(response)
//     if (!response.ok) {
//         console.log('siema500')
//         return json({ message: 'Nie udało się zaktualizować drużyny' }, { status: 500 })
//     }

//     return redirect('/')
// }
