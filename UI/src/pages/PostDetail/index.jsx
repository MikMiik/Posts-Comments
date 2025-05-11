import { useParams } from "react-router-dom"

import { useGetOnePostQuery } from "@/features/posts/postAPI"

function PostDetail() {
    const { id } = useParams()
    const { data, isLoading, error } = useGetOnePostQuery(id)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading post</div>

    const postDetail = data?.data || {}

    return <h2>{postDetail.content}</h2>
}

export default PostDetail
