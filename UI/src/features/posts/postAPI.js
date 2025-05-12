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
            query: (data) => ({
                url: "posts",
                method: "POST",
                body: data,
            }),
        }),
        updatePost: builder.mutation({
            query: ({ id, data }) => ({
                url: `posts/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
        deletePost: builder.mutation({
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
    useDeletePostMutation,
} = postsApi
