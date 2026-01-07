import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const apiBaseUrl = import.meta.env.VITE_API_URL;

if (!apiBaseUrl) {
  throw new Error('Environment variable API_URL must be defined');
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    logIn: builder.mutation({
      query: (post) => ({
        body: post,
        method: 'POST',
        url: 'users/sign_in'
      }),
      transformResponse: (response: any, meta) => {
        const headers = ['uid', 'access-token', 'client', 'expiry'].reduce((prev, curr) => ({ ...prev, [curr]: meta?.response?.headers?.get(curr) }), {});
        return { data: response, meta: { response: { headers } } };
      }
    }),
  }),
});

export const { useGetPostsQuery, useLogInMutation } = api;
