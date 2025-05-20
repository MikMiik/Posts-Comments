import CommentForm from "../CommentForm"
import Comment from "../Comment"
import {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useGetCommentsByPostIdQuery,
    useUpdateCommentMutation,
} from "@/features/comments/commentsAPI"
import { useState } from "react"

const Comments = ({ postId, currentUserId }) => {
    const { data, isLoading, error } = useGetCommentsByPostIdQuery(postId, { refetchOnMountOrArgChange: true })
    const [createComment] = useCreateCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()
    const [updateComment] = useUpdateCommentMutation({
        fixedCacheKey: "shared-update-comment",
    })
    const [activeComment, setActiveComment] = useState(null)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading comments</div>
    const comments = data?.data
    console.log(comments)
    const rootComments = comments
        .filter((comment) => comment.parent_id === null)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    const handleCreateComment = async (text, parent_id = null) => {
        await createComment({
            user_id: currentUserId,
            post_id: postId,
            parent_id: parent_id,
            content: text,
        })
        setActiveComment(null)
    }
    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId)
    }

    const handleUpdateComment = async (id, parent_id, text) => {
        const data = {
            user_id: currentUserId,
            post_id: postId,
            parent_id: parent_id,
            content: text,
        }
        await updateComment({ id, data })
        setActiveComment(null)
    }

    return (
        <div>
            <h2>Comments</h2>
            <div>Write comment</div>
            <CommentForm submitLabel="Comment" handleSubmit={handleCreateComment} />
            <div>
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        allComments={comments}
                        currentUserId={currentUserId}
                        addComment={handleCreateComment}
                        updateComment={handleUpdateComment}
                        deleteComment={handleDeleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments
