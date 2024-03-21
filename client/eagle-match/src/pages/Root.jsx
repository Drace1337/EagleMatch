import { useEffect } from 'react'
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'

import AdminNavigation from '../components/AdminNavigation.jsx'
import MainNavigation from '../components/MainNavigation.jsx'
import Header from '../components/Header.jsx'
import { getTokenDuration } from '../util/auth'

function RootLayout() {
	const token = useLoaderData()
	const submit = useSubmit()
	useEffect(() => {
		if (!token) {
			return
		}

		if (token === 'EXPIRED') {
			submit(null, { action: '/logout', method: 'post' })
			return
		}

		const tokenDuration = getTokenDuration()

		setTimeout(() => {
			submit(null, { action: '/logout', method: 'post' })
		}, tokenDuration)
	}, [token, submit])

	return (
		<>
			{token ? <AdminNavigation /> : <MainNavigation />}
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default RootLayout
