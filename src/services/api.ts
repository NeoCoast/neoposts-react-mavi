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
      const header = setAuthHeaders(headers);
      const token = header.get('access-token');

      if (token) {
        header.set('Authorization', `Bearer ${token}`);
      }

      return header;
    },
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    getFeed: builder.query({
      query: () => 'feed',
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
    createPost: builder.mutation({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
    getUsers: builder.query<{ users: any[]; meta?: { current_page?: number; total_pages?: number; total_count?: number } }, { search?: string; page?: number; per_page?: number } | void>({
      providesTags: ['User'],
      query: (params) => {
        const queryParams = new URLSearchParams();
        
        if (params?.search) queryParams.append('search', params.search);
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.per_page) queryParams.append('per_page', String(params.per_page));

        const queryString = queryParams.toString();

        return {
          method: 'GET',
          url: queryString ? `/users?${queryString}` : '/users',
        };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetFeedQuery,
  useGetMeQuery,
  useLogOutMutation,
  useLogInMutation,
  useSignupMutation,
  useCreatePostMutation,
  useGetUsersQuery,
} = api;
