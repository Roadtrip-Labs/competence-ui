// ** React Imports
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types


const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000'
})

type UserCompetency = {
  id: number
  name: string
  description: string
  proficiency_level: number
  goal_level: number
  relevance_level: number
  created_at: string
  updated_at: string
  user_id: number
}

type UserCompetencies = [
  {
    id: number
    name: string
    compentencies: UserCompetency[]
  }
]

const initialState: UserCompetencies  = [
  {
    id: 1,
    name: 'Competency 1',
    compentencies: [
      {
        id: 1,
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

export const getCompetencies = createAsyncThunk('userCompetencies/getCompetencies', async (params, { rejectWithValue }) => {
  const response = await axiosInstance.get('/get-users-competencies')
  if (response.data.error) {
    return rejectWithValue(response.data.error.message)
  }
  const data = response.data as UserCompetencies
  return data
})

const compentenciesSlice = createSlice({
  name: 'competencies',
  initialState,
  reducers: {
    updateSetting: (state, action) => {

    }
  },
  extraReducers: builder => {
    builder.addCase(getCompetencies.pending, state => {

    })
    builder.addCase(getCompetencies.fulfilled, (state, action) => {
      state = action.payload

    })
    builder.addCase(getCompetencies.rejected, state => {

    })
  }
})

// export const { updateSetting } = settingsSlice.actions
export default compentenciesSlice.reducer
