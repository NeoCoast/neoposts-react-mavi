import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { setAuthHeaders } from '@/utils/setHeaders';

const apiBaseUrl = import.meta.env.VITE_API_URL;
if (!apiBaseUrl) {
  throw new Error('Environment variable VITE_API_URL must be defined');
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      return setAuthHeaders(headers);
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    getMe: builder.query<any, void>({
      query: () => 'users/me',
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: 'users/sign_out',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetMeQuery,
  useLogOutMutation,
} = api;
