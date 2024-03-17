import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage, { loader as eventsLoader } from './pages/Home.jsx'
import RegulationsPage from './pages/Regulations.jsx'
import ContactPage, { action as contactAction } from './pages/Contact.jsx'
import ForumPage, { loader as forumLoader } from './pages/Forum.jsx'
import CreatePost, { action as createPostAction } from './pages/CreatePost.jsx'
import LoginPage, { action as loginAction } from './pages/Login.jsx'
import RegisterPage, { action as registerAction } from './pages/Register.jsx'
import { action as logoutAction } from './pages/Logout.jsx'
import ProfilePage, { loader as profileLoader } from './pages/Profile.jsx'
import UpdateProfile, { action as updateProfileAction } from './pages/UpdateProfile.jsx'
import ChangePasswordPage, { action as changePasswordAction } from './pages/ChangePassword.jsx'
import RankingPage, { loader as rankingLoader } from './pages/Ranking.jsx'
import CreateEventPage, { action as createEventAction, loader as createEventLoader } from './pages/CreateEvent.jsx'
import CreateTeam from './pages/CreateTeam.jsx'
import { action as manipulateTeamAction } from './components/TeamForm.jsx'
import UpdateTeam from './pages/UpdateTeam.jsx'
import MessageList, { loader as messagesLoader } from './pages/MessageList.jsx'
import MessageDetailPage, { loader as messageDetailLoader } from './pages/MessageDetail.jsx'
import EventPage, { loader as eventDetailLoader, action as joinEventAction } from './pages/Event.jsx'
import PostDetailPage, { loader as postDetailLoader, action as sendMessage } from './pages/PostDetail.jsx'
import TeamDetailPage, { loader as teamDetailLoader, action as teamDetailAction } from './pages/TeamDetail.jsx'
import RootLayout from './pages/Root.jsx'
import ErrorPage from './pages/Error.jsx'
import { tokenLoader, checkAuthLoader } from './util/auth.js'
import CreateLocation, { action as createLocationAction } from './pages/CreateLocation.jsx'
import LocationList, { loader as locationLoader } from './pages/LocationList.jsx'
import ChangePlayerInfo, { action as changeStatsAction } from './pages/ChangePlayerInfo.jsx'
import UserList, { loader as userListLoader } from './pages/UserList.jsx'
import UserDetail, { loader as userDetailLoader, action as manipulateUserAction } from './pages/UserDetail.jsx'
import TeamList, { loader as teamListLoader } from './pages/TeamList.jsx'
import ChangeTeamStats, { action as changeTeamStatsAction } from './pages/ChangeTeamStats.jsx'
import { action as deleteLocationAction } from './util/deleteLocation.js'
import { action as deleteReplyAction } from './util/deleteReply.js'
import { action as removeTeamMember } from './util/removeTeamMember.js'

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
			{ path: 'regulations', element: <RegulationsPage /> }, //działa
			{ path: 'contact', element: <ContactPage />, action: contactAction },
			{ path: 'forum', element: <ForumPage />, loader: forumLoader },
			{ path: 'forum/create-post', element: <CreatePost />, action: createPostAction },
			{ path: 'login', element: <LoginPage />, action: loginAction },
			{ path: 'register', element: <RegisterPage />, action: registerAction },
			{ path: 'logout', action: logoutAction },
			{
				path: 'profile/:id',
				element: <ProfilePage />,
				loader: profileLoader,
				id: 'profile',
				children: [],
			},
			{
				path: 'users/:id/change-player-info',
				element: <ChangePlayerInfo />,
				action: changeStatsAction,
				loader: profileLoader,
			},
			{
				path: 'profile/:id/edit-profile',
				element: <UpdateProfile />,
				action: updateProfileAction,
				loader: profileLoader,
			},
			{ path: 'profile/:id/change-password', element: <ChangePasswordPage />, action: changePasswordAction },
			{ path: 'messages', element: <MessageList />, loader: messagesLoader },
			{ path: 'messages/:messageId', element: <MessageDetailPage />, loader: messageDetailLoader },
			{ path: 'ranking', element: <RankingPage />, loader: rankingLoader },
			{ path: 'create-event', element: <CreateEventPage />, action: createEventAction, loader: createEventLoader }, // działa
			{ path: 'create-team', element: <CreateTeam />, action: manipulateTeamAction }, //nie działa
			{ path: 'team/:teamId/update', element: <UpdateTeam />, action: manipulateTeamAction }, //nie działa
			{ path: 'event/:eventId', element: <EventPage />, loader: eventDetailLoader, action: joinEventAction },
			{ path: 'post/:postId', element: <PostDetailPage />, loader: postDetailLoader, action: sendMessage },
			{ path: 'team/:teamId', element: <TeamDetailPage />, loader: teamDetailLoader, action: teamDetailAction },
			{
				path: 'team/:teamId/edit',
				element: <ChangeTeamStats />,
				action: changeTeamStatsAction,
				loader: teamDetailLoader,
			},
			{ path: 'venues/create-location', element: <CreateLocation />, action: createLocationAction }, //działa
			{ path: 'venues', element: <LocationList />, loader: locationLoader }, //działa
			{ path: 'venues/:locationId', action: deleteLocationAction },
			{ path: 'post/:postId/:replyId', action: deleteReplyAction },
			{ path: 'team/:teamId/:userId', action: removeTeamMember },
			{ path: 'users', element: <UserList />, loader: userListLoader },
			{ path: 'users/:userId', element: <UserDetail />, loader: userDetailLoader, action: manipulateUserAction },
			{ path: 'teams', element: <TeamList />, loader: teamListLoader },
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
