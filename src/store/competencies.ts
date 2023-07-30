// ** React Imports
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types
import { UserCompetencies } from 'src/types/UserCompetency'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL
})

enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

const initialState  = {
  status: Status.IDLE,
  users: [
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
        },
      ]
    }
  ]
}

export const getCompetencies = createAsyncThunk('userCompetencies/getCompetencies', async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/get-users-competencies')
    if (response.data.error) {
      return rejectWithValue(response.data.error.message)
    }
    const competencies = response.data as UserCompetencies

    return competencies
  } catch (e: any) {
    return rejectWithValue(e.message)
  }
})

const compentenciesSlice = createSlice({
  name: 'userCompetencies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCompetencies.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(getCompetencies.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.users = action.payload

    })
    builder.addCase(getCompetencies.rejected, state => {
      state.status = Status.FAILURE
    })
  }
})

export default compentenciesSlice.reducer
