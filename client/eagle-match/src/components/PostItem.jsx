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

import { useSubmit, useRouteLoaderData, Form } from 'react-router-dom'

export default function PostItem({ post }) {
    const token = useRouteLoaderData('root')
    const role = localStorage.getItem('role')

    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.author}</p>
            <p>{post.content}</p>

            <Form method='post'>
                <label htmlFor="reply">Skomentuj post:</label>
                <textarea id="reply" name="reply"></textarea>
                <button>Wyślij</button>
            </Form>
        </article>
    )
}