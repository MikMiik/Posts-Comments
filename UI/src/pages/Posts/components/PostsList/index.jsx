import { Link } from "react-router-dom"

import { useGetAllPostsQuery } from "@/features/posts/postsAPI"

function PostsList({ handleDeletePost }) {
    const {
        data: { data: { posts: allPosts } } = {},
        isLoading,
        error,
        isSuccess,
    } = useGetAllPostsQuery(undefined, { refetchOnMountOrArgChange: true })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading posts.</div>
    if (isSuccess) {
        return (
            <div style={{ margin: "20px 0" }}>
                <h2>Post List</h2>
                {allPosts.map((post) => (
                    <div key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </div>
                ))}
            </div>
        )
    }
}

export default PostsList
