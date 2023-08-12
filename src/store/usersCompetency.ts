// ** React Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Types
import type { UserCompetency } from 'src/types/User'

const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5000' : 'https://api.successsummit.io'

// Define a service using a base URL and expected endpoints
export const usersCompetencyApi = createApi({
  reducerPath: 'userCompetencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Request-Headers', 'X-Requested-With')
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  tagTypes: ['UserCompetency'],
  endpoints: builder => ({
    getUserCompetencies: builder.query<UserCompetency[], number>({
      query: (userId: number) => `/users/${userId}/competencies`,
      providesTags: ['UserCompetency']
    }),
    updateCompetency: builder.mutation<UserCompetency, { userId: number, competency: any }>({
      query: ({ userId, competency }) => ({
        url: `/users/${userId}/competencies/${competency.id}/update`,
        method: 'POST',
        body: competency
      }),
      invalidatesTags: ['UserCompetency']
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserCompetenciesQuery, useUpdateCompetencyMutation } = usersCompetencyApi
