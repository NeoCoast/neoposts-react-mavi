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
  tagTypes: ['Post', 'User'],
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
  useGetMeQuery,
  useLogOutMutation,
  useLogInMutation,
  useSignupMutation,
} = api;
