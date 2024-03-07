import { useState, useEffect } from 'react'
import { getAuthToken } from './auth.js'

export function useRanking(type) {
	const [ranking, setRanking] = useState([])
	useEffect(() => {
		if (type !== '') {
			fetch(`http://localhost:3001/ranking/${type}`, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + getAuthToken(),
				},
			})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					setRanking(data)
				})
		}
	}, [type])

	return ranking
}
