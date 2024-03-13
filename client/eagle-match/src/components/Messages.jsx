import { Link } from 'react-router-dom'

export default function Messages({ messages }) {
    console.log(messages)
	return (
		<div>
			<h2>Messages</h2>
            
			<ul>
				{messages.map(message => (
					<li key={message._id}>
						<Link to={`/messages/${message._id}`}>{message.topic}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
