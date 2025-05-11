import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_POST_URL }),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => "posts",
        }),
        getOnePost: builder.query({
            query: (id) => `posts/${id}`,
        }),
        createPost: builder.mutation({
            query: ({ newPost }) => ({
                url: "posts",
                method: "POST",
                body: newPost,
            }),
        }),
        updatePost: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `posts/${id}`,
                method: "PATCH",
                body: patch,
            }),
        }),
        delete: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetAllPostsQuery,
    useGetOnePostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeleteMutation,
} = postsApi
