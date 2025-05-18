import CommentForm from "../CommentForm"
import Comment from "../Comment"
import { useCreateCommentMutation, useGetCommentsByPostIdQuery } from "@/features/comments/commentsAPI"

const Comments = ({ postId, currentUserId }) => {
    const { data, isLoading, error } = useGetCommentsByPostIdQuery(postId, { refetchOnMountOrArgChange: true })
    const [createComment] = useCreateCommentMutation()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading comments</div>
    console.log(data)
    const comments = data?.data
    // const [activeComment, setActiveComment] = useState(null)
    const rootComments = comments
        .filter((comment) => comment.parent_id === null)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    const getReplies = (commentId) =>
        comments
            .filter((comment) => comment.parent_id === commentId)
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    const addComment = async (text, parent_id) => {
        await createComment({
            user_id: currentUserId,
            post_id: postId,
            parent_id: null,
            content: text,
        })
    }

    return (
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments
