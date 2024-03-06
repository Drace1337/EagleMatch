import logo from './logo.svg'
import './App.css'
import Header from './components/Header'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage, { loader as eventsLoader } from './pages/Home.jsx'
import RegulationsPage from './pages/Regulations.jsx'
import ContactPage from './pages/Contact.jsx'
import ForumPage from './pages/Forum.jsx'
import HistoryPage from './pages/History.jsx'
import LoginPage, { action as loginAction } from './pages/Login.jsx'
import RegisterPage, { action as registerAction } from './pages/Register.jsx'
import { action as logoutAction } from './pages/Logout.jsx'
import ProfilePage from './pages/Profile.jsx'
import RankingPage from './pages/Ranking.jsx'
import CreateEventPage, { action as createEventAction } from './pages/CreateEvent.jsx'
import CreateTeamPage from './pages/CreateTeam.jsx'
import EventPage, { loader as eventDetailLoader, action as joinEventAction } from './pages/Event.jsx'
import PostPage from './pages/Post.jsx'
import TeamPage from './pages/Team.jsx'
import RootLayout from './pages/Root.jsx'
import ErrorPage from './pages/Error.jsx'
import { tokenLoader, checkAuthLoader } from './util/auth.js'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		id: 'root',
		loader: tokenLoader,
		children: [
			{
				index: true,
				element: HomePage,
				loader: eventsLoader,
				action: joinEventAction,
			},
			{ path: 'regulations', element: <RegulationsPage />, loader: checkAuthLoader},
			{ path: 'contact', element: <ContactPage /> },
			{ path: 'forum', element: <ForumPage /> },
			{ path: 'history', element: <HistoryPage /> },
			{ path: 'login', element: <LoginPage />, action: loginAction },
			{ path: 'register', element: <RegisterPage />, action: registerAction },
			{ path: 'logout', action: logoutAction},
			{ path: 'profile/:id', element: <ProfilePage /> },
			{ path: 'ranking', element: <RankingPage /> },
			{ path: 'create-event', element: <CreateEventPage />, action: createEventAction },
			{ path: 'create-team', element: <CreateTeamPage /> },
			{ path: 'event/:eventId', element: <EventPage />, loader: eventDetailLoader },
			{ path: 'post/:postId', element: <PostPage /> },
			{ path: 'team/:teamId', element: <TeamPage /> },
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
