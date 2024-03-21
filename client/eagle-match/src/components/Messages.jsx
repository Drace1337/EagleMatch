import { Link } from 'react-router-dom'
import classes from './Messages.module.scss'

export default function Messages({ messages }) {
	return (
		<div className={classes.messages}>
			<h2>Wiadomości</h2>

			<ul className={classes.messages__list}>
				{messages.map(message => (
					<li key={message._id} className={classes.messages__list__item}>
						<Link to={`/messages/${message._id}`}>{message.topic}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
