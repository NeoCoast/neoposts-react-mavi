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
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('access-token');
      const client = localStorage.getItem('client');
      const uid = localStorage.getItem('uid');
      const tokenType = localStorage.getItem('token-type');

      if (accessToken) headers.set('access-token', accessToken);
      if (client) headers.set('client', client);
      if (uid) headers.set('uid', uid);
      if (tokenType) headers.set('token-type', tokenType);

      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    logOut: builder.mutation({
      query: () => ({
        method: 'DELETE',
        url: 'users/sign_out'
      }),
      transformResponse: (response, meta) => ({
        meta,
        response
      })
    }),
  }),
});

export const { useGetPostsQuery, useLogOutMutation } = api;
