import { Link } from "react-router-dom"

import { useGetAllPostsQuery, useCreatePostMutation, useDeletePostMutation } from "@/features/posts/postAPI"
import { Form, TextInput } from "@/components/Forms"

function Posts() {
    const [createPost] = useCreatePostMutation()
    const [deletePost] = useDeletePostMutation()
    const { data, isLoading, error, refetch } = useGetAllPostsQuery()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading posts.</div>

    const allPosts = data?.data || []

    const onSubmit = async (data) => {
        try {
            const result = await createPost(data).unwrap()
            console.log("Result:", result)
            refetch()
        } catch (err) {
            console.error("Create post failed:", err)
        }
    }

    const handleDeletePost = async (id) => {
        try {
            const result = await deletePost(id).unwrap()
            console.log("Result:", result)
            refetch()
        } catch (err) {
            console.error("Create post failed:", err)
        }
    }

    return (
        <>
            <h2>Post List</h2>
            {allPosts.map((post) => (
                <div key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    <br />
                </div>
            ))}
            <br />
            <Form
                defaultValues={{
                    title: "",
                    content: "",
                }}
                onSubmit={onSubmit}
            >
                <TextInput name="title" placeholder="Title"></TextInput>
                <TextInput name="content" placeholder="Content"></TextInput>
                <button>Add</button>
            </Form>
        </>
    )
}

export default Posts
