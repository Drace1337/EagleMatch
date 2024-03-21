import classes from './MessageItem.module.scss'

export default function MessageItem({ message }) {
	return (
		<article className={classes.message}>
			<h2>Temat wiadomości: {message.topic}</h2>
			<div className={classes.message__content}>
				<p>Mail użytkownika: {message.email}</p>
				<p>Treść wiadomści: {message.message}</p>
			</div>
		</article>
	)
}
