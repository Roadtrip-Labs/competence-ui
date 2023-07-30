// ** React Imports
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types
import { Users } from 'src/types/User'

const axiosInstance = axios.create({
  baseURL: 'https://api.successsummit.io',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export enum UserCompetenciesStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

const initialState = [
  {
    id: 0,
    name: 'Vincent',
    compentencies: [
      {
        id: 0,
        name: 'Competency 1',
        description: 'Competency 1',
        proficiency_level: 1,
        goal_level: 1,
        relevance_level: 1,
        created_at: '2021-08-01T00:00:00.000000Z',
        updated_at: '2021-08-01T00:00:00.000000Z',
        user_id: 1
      }
    ]
  }
]

export const getUserCompetencies = createAsyncThunk('userCompetencies/getCompetencies', async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/get-users-competencies')
    if (response.data.error) {
      return rejectWithValue(response.data.error.message)
    }
    const competencies = response.data as Users

    return competencies
  } catch (e: any) {
    return rejectWithValue(e.message)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserCompetencies.fulfilled, (state, action) => {
      state = action.payload
    })
  }
})

export default usersSlice.reducer
