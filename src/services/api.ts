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

    logIn: builder.mutation({
      query: (body) => ({
        url: 'users/sign_in',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any, meta) => {
        const headers = ['uid', 'access-token', 'client', 'expiry'].reduce(
          (acc, key) => ({
            ...acc,
            [key]: meta?.response?.headers?.get(key),
          }),
          {}
        );

        return { data: response, headers };
      },
    }),

    signup: builder.mutation({
      query: ({ name, email, password, confirmPassword }) => ({
        url: 'users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLogInMutation,
  useSignupMutation,
} = api;
