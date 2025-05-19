import { useParams } from "react-router-dom"

import { useGetOnePostQuery, useUpdatePostMutation } from "@/features/posts/postsAPI"
import { Form, TextInput } from "@/components/Forms"
import Comments from "@/components/Comments"

function PostDetail() {
    const { id } = useParams()
    const [updatePost] = useUpdatePostMutation({
        fixedCacheKey: "shared-update-post",
    })

    const { data, isLoading, error } = useGetOnePostQuery(id, { refetchOnMountOrArgChange: true })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading post</div>
    const postDetail = data?.data || {}

    const onSubmit = async (data) => {
        try {
            const filteredData = Object.fromEntries(Object.entries(data).filter(([, value]) => value !== ""))
            const result = await updatePost({ id, filteredData }).unwrap()
            console.log("Result:", result)
        } catch (err) {
            console.error("Create post failed:", err)
        }
    }

    return (
        <>
            <h2>Title: {postDetail.title}</h2>
            <h3>Description: {postDetail.description}</h3>
            <p>Content: {postDetail.content}</p>
            <>
                <Form
                    defaultValues={{
                        title: "",
                        content: "",
                    }}
                    onSubmit={onSubmit}
                >
                    <TextInput name="title" placeholder="Title"></TextInput>
                    <TextInput name="description" placeholder="Description"></TextInput>
                    <TextInput name="content" placeholder="Content"></TextInput>
                    <button>Edit</button>
                </Form>
            </>
            <br />
            <Comments postId={postDetail.id} currentUserId={67}></Comments>
        </>
    )
}

export default PostDetail
