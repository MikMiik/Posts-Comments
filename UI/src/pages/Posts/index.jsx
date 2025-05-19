import { useCreatePostMutation, useDeletePostMutation } from "@/features/posts/postsAPI"
import { Form, TextInput } from "@/components/Forms"
import PostsList from "./components/PostsList"

function Posts() {
    const [createPost] = useCreatePostMutation()
    const [deletePost] = useDeletePostMutation()

    const onSubmit = async (data) => {
        try {
            const result = await createPost({ ...data, user_id: 67 }).unwrap()
            console.log("Result:", result)
        } catch (err) {
            console.error("Create post failed:", err)
        }
    }

    const handleDeletePost = async (id) => {
        try {
            const result = await deletePost(id).unwrap()
            console.log("Result:", result)
        } catch (err) {
            console.error("Delete post failed:", err)
        }
    }

    return (
        <>
            <PostsList handleDeletePost={handleDeletePost} />
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
                <button>Add</button>
            </Form>
        </>
    )
}

export default Posts
