
import { useSubmit,  Form,  } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'
import classes from './PostItem.module.scss'

export default function PostItem({ post, replies }) {
	const submit = useSubmit()
	const role = JSON.parse(getAuthToken()).role
	function startDeleteHandler() {
		const proceed = window.confirm('Are you sure?')
		if (proceed) {
			submit(null, { method: 'delete' })
		}
	}
	return (
		<>
			<article className={classes.post}>
				<div className={classes.post__content}>
					<h2>Temat posta: {post.title}</h2>
					<p>Autor: {post.author.name}</p>
					<p>Treść: </p>
					<p>{post.content}</p>
					{role === 3 && <button onClick={startDeleteHandler}>Usuń post</button>}
				</div>
				<div className={classes.post__comment}>
					<Form method='post' className={classes.post__comment__form}>
						<label htmlFor='reply'>Skomentuj post:</label>

						<textarea id='reply' name='reply'></textarea>
						<button>Wyślij</button>
					</Form>
				</div>
			</article>
			<div className={classes.comments}>
				<h3>Komentarze:</h3>
				{replies.post === post._id ? (
					<p>Brak komentarzy</p>
				) : (
					<ul className={classes.comments__list}>
						{replies.map(reply => (
							<li key={reply._id} className={classes.comments__list__item}>
								<div className={classes.comments__list__item__content}>
									<p>{reply.author.name}</p>
									<p>{reply.comment}</p>
								</div>
								{role === 3 && (
									<div className={classes.comments__list__item__action}>
										<Form method='delete' action={`/post/${post._id}/${reply._id}`}>
											<button>Usuń komentarz</button>
										</Form>
									</div>
								)}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	)
}
