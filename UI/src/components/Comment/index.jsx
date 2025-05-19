import dayjs from "dayjs"
import CommentForm from "../CommentForm"

function Comment({
    comment,
    allComments = [],
    currentUserId,
    addComment,
    deleteComment,
    updateComment,
    activeComment,
    setActiveComment,
}) {
    const canReply = !!currentUserId
    const canEdit = currentUserId === comment.user_id
    const canDelete = currentUserId === comment.user_id
    const createdAt = dayjs(comment.created_at).format("HH:mm DD/MM/YYYY")
    const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying"
    const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === "editing"
    const replies = allComments
        .filter((postComment) => postComment.parent_id === comment.id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return (
        <div>
            <div>
                <div> User ID: {comment.user_id}</div>
                <div> Comment ID: {comment.id}</div>
                <div> Parent ID: {comment.parent_id}</div>
                <div> Create_at: {createdAt}</div>
                {!isEditing && <div> Content: {comment.content}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Edit"
                        hasCancelButton
                        initialText={comment.content}
                        handleSubmit={(text) => updateComment(comment.id, comment.parent_id, text)}
                        handleCancel={() => {
                            setActiveComment(null)
                        }}
                    />
                )}
                <div>
                    {canReply && (
                        <button onClick={() => setActiveComment({ id: comment.id, type: "replying" })}>Reply</button>
                    )}
                    {canEdit && (
                        <button onClick={() => setActiveComment({ id: comment.id, type: "editing" })}>Edit</button>
                    )}
                    {canDelete && <button onClick={() => deleteComment(comment.id)}>Delete</button>}
                </div>
                {isReplying && (
                    <CommentForm
                        submitLabel="Reply"
                        hasCancelButton
                        handleCancel={() => {
                            setActiveComment(null)
                        }}
                        handleSubmit={(text) => addComment(text, comment.id)}
                    />
                )}
                {replies.length > 0 && (
                    <div style={{ margin: "30px 40px" }}>
                        {replies.map((reply) => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                allComments={allComments}
                                currentUserId={currentUserId}
                                addComment={addComment}
                                deleteComment={deleteComment}
                                updateComment={updateComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                            />
                        ))}
                    </div>
                )}
            </div>
            <br />
        </div>
    )
}

export default Comment
