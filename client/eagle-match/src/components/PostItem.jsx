// import Button from "./UI/Button.jsx";

// function PostItem({ post }) {
//     return (
//         <li key={post.id} className='post-item'>
//             <article>
//                 <div>
//                     <h2>{post.title}</h2>
//                     <p>{post.author}</p>
//                 </div>
//                 <p>
//                     <Button>View Post</Button>
//                 </p>
//             </article>
//         </li>
//     )
// }

// export default PostItem;

import { useSubmit, useRouteLoaderData, Form, json } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'
import classes from './PostItem.module.scss'

export default function PostItem({ post, replies }) {
	// console.log(post.author)
	const submit = useSubmit()
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
					{JSON.parse(localStorage.getItem('userData')).role === 3 && (
						<button onClick={startDeleteHandler}>Usuń post</button>
					)}
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
						{/* {post.replies.map(comment => (
							<li key={comment._id}>
								<p>{comment.comment}</p>
								<p>{comment.author}</p>
							</li>
						))} */}
						{replies.map(reply => (
							<li key={reply._id} className={classes.comments__list__item}>
								<div className={classes.comments__list__item__content}>
									<p>{reply.author.name}</p>
									<p>{reply.comment}</p>
								</div>
								{JSON.parse(localStorage.getItem('userData')).role === 3 && (
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
