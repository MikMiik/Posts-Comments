import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentsApi = createApi({
    reducerPath: "commentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_POST_URL }),
    tagTypes: ["Comment"],
    endpoints: (builder) => ({
        getAllComments: builder.query({
            query: () => `comments`,
            providesTags: ["Comment"],
        }),
        getOneComment: builder.query({
            query: (id) => `comments/${id}`,
        }),
        getCommentsByPostId: builder.query({
            query: (id) => `posts/${id}/comments`,
            providesTags: ["Comment"],
        }),
        createComment: builder.mutation({
            query: (data) => ({
                url: "comments",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Comment"],
        }),
        updateComment: builder.mutation({
            query: ({ id, data }) => ({
                url: `comments/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Comment"],
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
