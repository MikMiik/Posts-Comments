function Comment({ comment, replies, addComment, currentUserId }) {
    return (
        <div key={comment.id}>
            <span>
                User ID: {comment.user_id}
                <p> Create_at: {comment.created_at}</p>
                <p>{comment.content}</p>
            </span>
            <br />
        </div>
    )
}

export default Comment
