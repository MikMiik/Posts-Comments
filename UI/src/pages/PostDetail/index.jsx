import { useParams } from "react-router-dom"
import { useState } from "react"

import { useGetOnePostQuery, useUpdatePostMutation } from "@/features/posts/postAPI"
import { Form, TextInput } from "@/components/Forms"

function PostDetail() {
    const [editActive, setEditActive] = useState(true)
    const { id } = useParams()
    const [updatePost] = useUpdatePostMutation({
        fixedCacheKey: "shared-update-post",
    })

    const { data, isLoading, error, refetch } = useGetOnePostQuery(id)
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
                result.data.title && result.data.content && refetch()
            }
        } catch (err) {
            console.error("Create post failed:", err)
        }
    }

    return (
        <>
            <h2>{postDetail.title}</h2>
            <h2>{postDetail.content}</h2>
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
        </>
    )
}

export default PostDetail
