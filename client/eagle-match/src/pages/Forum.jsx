import { json, useLoaderData, redirect } from 'react-router-dom'

import Posts from '../components/Posts.jsx'

function ForumPage() {
    const data = useLoaderData()
    // if (data.isError) {
    // 	return <p>{data.message}</p>
    // }

    const posts = data.posts

    return (
        <>
            <h1>Forum</h1>

            <Posts posts={posts} />
        </>
    )
}

export async function loader() {
    const response = await fetch('http://localhost:3001/posts')

    if (!response.ok) {
        return json({ message: 'Nie udało się załadować postów.' }, { status: 500 })
    } else {
        return response
    }
}

export default ForumPage
