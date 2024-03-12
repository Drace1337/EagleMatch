import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage, { loader as eventsLoader } from './pages/Home.jsx'
import RegulationsPage from './pages/Regulations.jsx'
import ContactPage, { action as contactAction } from './pages/Contact.jsx'
import ForumPage, { loader as forumLoader, action as forumAction } from './pages/Forum.jsx'
import HistoryPage from './pages/History.jsx'
import LoginPage, { action as loginAction } from './pages/Login.jsx'
import RegisterPage, { action as registerAction } from './pages/Register.jsx'
import { action as logoutAction } from './pages/Logout.jsx'
import ProfilePage, { loader as profileLoader } from './pages/Profile.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import RankingPage, { loader as rankingLoader } from './pages/Ranking.jsx'
import CreateEventPage, { action as createEventAction, loader as createEventLoader } from './pages/CreateEvent.jsx'
import CreateTeam, { action as manipulateTeamAction } from './pages/CreateTeam.jsx'

import EventPage, { loader as eventDetailLoader } from './pages/Event.jsx'
import PostDetailPage, { loader as postDetailLoader, action as sendMessage } from './pages/PostDetail.jsx'
import TeamPage from './pages/TeamDetail.jsx'
import RootLayout from './pages/Root.jsx'
import ErrorPage from './pages/Error.jsx'
import { tokenLoader, checkAuthLoader } from './util/auth.js'
import CreateLocation, { action as createLocationAction } from './pages/CreateLocation.jsx'
import LocationList, { loader as locationLoader } from './pages/LocationList.jsx'
import ChangePlayerInfo, { action as changeStatsAction } from './pages/ChangePlayerInfo.jsx'
import UserList, { loader as userListLoader, action as userDeleteAction } from './pages/UserList.jsx'

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
				element: <HomePage />,
				loader: eventsLoader, //działa
			},
			{ path: 'regulations', element: <RegulationsPage />, loader: checkAuthLoader }, //działa
			{ path: 'contact', element: <ContactPage />, action: contactAction },
			{ path: 'forum', element: <ForumPage />, loader: forumLoader, action: forumAction },
			{ path: 'history', element: <HistoryPage /> },
			{ path: 'login', element: <LoginPage />, action: loginAction },
			{ path: 'register', element: <RegisterPage />, action: registerAction },
			{ path: 'logout', action: logoutAction },
			{ path: 'profile/:id', element: <ProfilePage />, loader: profileLoader, id: 'profile' },
			{ path: 'update-profile', element: <UpdateProfile /> },
			{ path: 'ranking', element: <RankingPage />, loader: rankingLoader },
			{ path: 'create-event', element: <CreateEventPage />, action: createEventAction, loader: createEventLoader }, // działa
			{ path: 'create-team', element: <CreateTeam />, action: manipulateTeamAction }, //nie działa
			{ path: 'event/:eventId', element: <EventPage />, loader: eventDetailLoader },
			{ path: 'post/:postId', element: <PostDetailPage />, loader: postDetailLoader, action: sendMessage },
			{ path: 'team/:teamId', element: <TeamPage /> },
			{ path: 'create-location', element: <CreateLocation />, action: createLocationAction }, //działa
			{ path: 'venues', element: <LocationList />, loader: locationLoader }, //działa
			{ path: 'change-player-info', element: <ChangePlayerInfo />, action: changeStatsAction },
			{ path: 'users', element: <UserList />, loader: userListLoader, action: userDeleteAction },
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
