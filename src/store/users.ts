// ** React Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Types
import type { User } from 'src/types/User'

const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5000' : 'https://api.successsummit.io'

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Request-Headers', 'X-Requested-With')
      headers.set('Content-Type', 'application/json')

      return headers
    }
  }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users']
    }),
    getUserById: builder.query<User, number>({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['Users']
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi
