import { useState, useEffect } from 'react'
import { getAuthToken } from './auth.js'

export function useRanking(type) {
	const [ranking, setRanking] = useState({})
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		if (type !== '') {
			setLoading(true)
			fetch(`http://localhost:3001/ranking/${type}`, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + JSON.parse(getAuthToken()).token,
				},
			})
				.then(response => response.json())
				.then(data => {
					setRanking(data)
					setLoading(false)
				})
		}
	}, [type])
	return { ranking, loading }
}
