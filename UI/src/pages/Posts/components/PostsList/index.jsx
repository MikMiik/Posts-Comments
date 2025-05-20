import { Link } from "react-router-dom"

function PostsList({ posts, handleDeletePost }) {
    return (
        <div style={{ margin: "20px 0" }}>
            <h2>Post List</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default PostsList
