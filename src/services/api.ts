import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const apiBaseUrl = import.meta.env.VITE_API_URL;
if (!apiBaseUrl) {
  throw new Error('Environment variable VITE_API_URL must be defined');
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access-token');
      const tokenType = localStorage.getItem('token-type');
      const client = localStorage.getItem('client');
      const expiry = localStorage.getItem('expiry');
      const uid = localStorage.getItem('uid');

      if (token) {
        headers.set('access-token', token);
      }

      if (tokenType) {
        headers.set('token-type', tokenType);
      }

      if (client) {
        headers.set('client', client);
      }

      if (expiry) {
        headers.set('expiry', expiry);
      }

      if (uid) {
        headers.set('uid', uid);
      }

      return headers;
    }
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: 'users/sign_out',
      }),
    }),
  }),
});

export const { useGetPostsQuery, useLogOutMutation } = api;
