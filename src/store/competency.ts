// ** React Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Types
import type { Competency } from 'src/types/User'

const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5000' : 'https://api.successsummit.io'

// Define a service using a base URL and expected endpoints
export const competencyApi = createApi({
  reducerPath: 'competencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Request-Headers', 'X-Requested-With')
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  tagTypes: ['Competency'],
  endpoints: builder => ({
    getCompetencies: builder.query<Competency[], void>({
      query: () => '/competencies',
      providesTags: ['Competency']
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCompetenciesQuery } = competencyApi
