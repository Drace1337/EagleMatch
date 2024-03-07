import PostItem from '../components/PostItem.jsx'
import { useLoaderData, json, redirect } from 'react-router-dom'
import { getAuthToken } from '../util/auth.js'

function PostDetailPage() {
    const data = useLoaderData()

    return (
        <>
            <PostItem post={data.post} />
        </>
    )
}

export async function loader({ request, params }) {
    const id = params.postId

    const response = await fetch('http://localhost:3001/post/' + id)
    if (!response.ok) {
        return json({ message: 'Nie udało się załadować posta' }, { status: 500 })
    } else {
        return response
    }
}

export async function action({ request, params }) {
    const id = params.replyId

    const response = await fetch('http://localhost:3001/reply/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getAuthToken(request),
        },
    })
    if (!response.ok) {
        return json({ message: 'Nie udało się wysłać odpowiedzi' }, { status: 500 })
    } else {
        return response
    }
}
export default PostDetailPage