import { useState, useEffect } from 'react'
import { getAuthToken } from './auth.js'

export function useRanking(type) {
	const [ranking, setRanking] = useState({})
	const [loading, setLoading] = useState(false)
	console.log(type)
	useEffect(() => {
		if (type !== '') {
			setLoading(true)
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
					setLoading(false)
				})
		}
	}, [type])
	console.log(ranking)
	return { ranking, loading }
}
