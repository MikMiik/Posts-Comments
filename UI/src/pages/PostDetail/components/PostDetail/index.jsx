import { useGetOnePostQuery } from "@/features/posts/postsAPI"

function PostDetail(id) {
    const { data, isLoading, error } = useGetOnePostQuery(id, { refetchOnMountOrArgChange: true })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading post</div>
    const postDetail = data?.data || {}
    return (
        <>
            <h2>Title: {postDetail.title}</h2>
            <h3>Description: {postDetail.description}</h3>
            <p>Content: {postDetail.content}</p>
        </>
    )
}

export default PostDetail
