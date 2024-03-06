export async function action({ params, request }) {
	const eventData = {
        players: localStorage.getItem('userId'),
    }

	const eventId = params.eventId
	const response = await fetch(
		'http://localhost:3001/events' + eventId,
		{ method: 'PATCH' },
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getAuthToken(),
			},
			body: JSON.stringify(eventData),
		}
	)

	if (!response.ok) {
		throw json({ message: 'Nie udało się dołączyć do wydarzenia.' }, { status: 500 })
	}
	return redirect('/')
}