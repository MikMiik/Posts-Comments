import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_POST_URL }),
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: (limit = 10) => `posts?limit=${limit}`,
            providesTags: ["Post"],
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
            invalidatesTags: ["Post"],
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
            invalidatesTags: ["Post"],
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
