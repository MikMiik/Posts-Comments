import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentsApi = createApi({
    reducerPath: "commentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_POST_URL }),
    tagTypes: ["Comment"],
    endpoints: (builder) => ({
        getAllComments: builder.query({
            query: (limit = 10) => `comments?limit=${limit}`,
            providesTags: ["Comment"],
        }),
        getOneComment: builder.query({
            query: (id) => `comments/${id}`,
        }),
        getCommentsByPostId: builder.query({
            query: (id) => `posts/${id}/comments`,
            providesTags: (result, error, id) => [{ type: "Comment", id }],
        }),
        createComment: builder.mutation({
            query: (data) => ({
                url: "comments",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, { post_id }) => [{ type: "Comment", id: post_id }],
        }),
        updateComment: builder.mutation({
            query: ({ id, data }) => ({
                url: `comments/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `comments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Comment"],
        }),
    }),
})

export const {
    useGetAllCommentsQuery,
    useGetOneCommentQuery,
    useGetCommentsByPostIdQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentsApi
