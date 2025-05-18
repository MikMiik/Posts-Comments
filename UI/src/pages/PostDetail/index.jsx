import { useParams } from "react-router-dom"
import { useState } from "react"

import { useGetOnePostQuery, useUpdatePostMutation } from "@/features/posts/postsAPI"
import { Form, TextInput } from "@/components/Forms"
import Comments from "@/components/Comments"

function PostDetail() {
    const [editActive, setEditActive] = useState(true)
    const { id } = useParams()
    const [updatePost] = useUpdatePostMutation({
        fixedCacheKey: "shared-update-post",
    })

    const { data, isLoading, error } = useGetOnePostQuery(id, { refetchOnMountOrArgChange: true })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading post</div>
    const postDetail = data?.data || {}
    function handleEdit() {
        setEditActive(!editActive)
    }

    const onSubmit = async (data) => {
        try {
            const result = await updatePost({ id, data }).unwrap()
            console.log("Result:", result)
            {
                result.data.title && result.data.content && setEditActive(!editActive)
            }
        } catch (err) {
            console.error("Create post failed:", err)
        }
    }

    return (
        <>
            <h2>Title: {postDetail.title}</h2>
            <h3>Description: {postDetail.description}</h3>
            <p>Content: {postDetail.content}</p>
            {editActive && <button onClick={handleEdit}>Edit</button>}
            {!editActive && (
                <>
                    <Form
                        defaultValues={{
                            title: "",
                            content: "",
                        }}
                        onSubmit={onSubmit}
                    >
                        <TextInput name="title" placeholder="Title"></TextInput>
                        <TextInput name="content" placeholder="Content"></TextInput>
                        <button>Done</button>
                    </Form>
                </>
            )}
            <br />
            <h2>Comments List</h2>
            <Comments postId={postDetail.id} currentUserId={67}></Comments>
        </>
    )
}

export default PostDetail
