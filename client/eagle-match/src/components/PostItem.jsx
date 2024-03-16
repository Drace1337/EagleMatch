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
			<article>
				<h1>{post.title}</h1>
				<p>{post.author.name}</p>
				<p>{post.content}</p>
				{JSON.parse(localStorage.getItem('userData')).role === 3 && (
					<button onClick={startDeleteHandler}>Usuń post</button>
				)}

				<Form method='post'>
					<label htmlFor='reply'>Skomentuj post:</label>
					<textarea id='reply' name='reply'></textarea>
					<button>Wyślij</button>
				</Form>
			</article>
			<div>
				<h2>Komentarze:</h2>
				{replies.post === post._id ? (
					<p>Brak komentarzy</p>
				) : (
					<ul>
						{/* {post.replies.map(comment => (
							<li key={comment._id}>
								<p>{comment.comment}</p>
								<p>{comment.author}</p>
							</li>
						))} */}
						{replies.map(reply => (
							<li key={reply._id}>
								<p>{reply.comment}</p>
								<p>{reply.author.name}</p>
								<Form method='delete' action={`/post/${post._id}/${reply._id}`}>
									<button>Usuń komentarz</button>
								</Form>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	)
}
