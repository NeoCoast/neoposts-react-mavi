import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const apiBaseUrl = import.meta.env.VITE_API_URL;
if (!apiBaseUrl) {
  throw new Error('Environment variable VITE_API_URL must be defined');
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    signup: builder.mutation({
      invalidatesTags: ['User'],
      query: (post) => ({
        body: post,
        method: 'POST',
        url: 'users'
      }),
      transformResponse: (response, meta) => ({
        meta,
        response
      })
    }),
  }),
});

export const { useGetPostsQuery, useSignupMutation } = api;
