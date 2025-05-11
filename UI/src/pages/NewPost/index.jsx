import { Form, TextInput } from "@/components/Forms"
import { useCreatePostMutation } from "@/features/posts/postAPI"

function NewPost() {
    const [createPost, result] = useCreatePostMutation()
    console.log(createPost)
    console.log(result)

    const onSubmit = async (data) => {
        createPost(data)
    }

    return (
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
                <button>Add</button>
            </Form>
        </>
    )
}

export default NewPost
