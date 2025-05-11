import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_POST_URL }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => 'posts',
    }),
    getOnePost: builder.query({
      query: (id) => `posts/${id}`,
    }),
  }),
});

export const { useGetAllPostsQuery, useGetOnePostQuery } = postsApi;