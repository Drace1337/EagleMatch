import { useRouteError } from 'react-router-dom'
import PageContent from '../components/PageContent.jsx'
import MainNavigation from '../components/MainNavigation.jsx'

function ErrorPage() {
	const error = useRouteError()
	let title = 'Wystąpił błąd!'
	let message = 'Przepraszamy, ale coś poszło nie tak.'

	if (error.status === 500) {
		message = error.data.message
	}

	if (error.status === 404) {
		title = 'Strona nie znaleziona!'
		message = 'Przepraszamy, ale nie udało się znaleźć strony.'
	}

	return (
		<>
			<MainNavigation />
			<PageContent title={title}>
				<p>{message}</p>
			</PageContent>
		</>
	)
}

export default ErrorPage