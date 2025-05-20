import { useCreatePostMutation, useDeletePostMutation, useGetAllPostsQuery } from "@/features/posts/postsAPI"
import { Form, TextInput } from "@/components/Forms"
import PostsList from "./components/PostsList"

function Posts() {
    const { data, isLoading, error, isSuccess, refetch } = useGetAllPostsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const [deletePost] = useDeletePostMutation()
    const [createPost] = useCreatePostMutation()

    const handleDeletePost = async (id) => {
        try {
            console.log(id)
            const result = await deletePost(id).unwrap()
            console.log("Result:", result)
            refetch()
        } catch (err) {
            console.error("Delete post failed:", err)
        }
    }

    const onSubmit = async (data) => {
        try {
            const result = await createPost({ ...data, user_id: 67 }).unwrap()
            console.log("Result:", result)
        } catch (err) {
            console.error("Create post failed:", err)
        }
    }
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading posts.</div>
    if (isSuccess) {
        const posts = data?.data.posts || []
        return (
            <>
                <PostsList posts={posts} handleDeletePost={handleDeletePost} />
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
}

export default Posts
