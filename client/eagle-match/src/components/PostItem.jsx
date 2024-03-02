import Button from "./UI/Button.jsx";

export default function PostItem({ post }) {
    return (
        <li key={post.id} className='post-item'>
            <article>
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.author}</p>
                </div>
                <p>
                    <Button>View Post</Button>
                </p>
            </article>
        </li>
    )
}