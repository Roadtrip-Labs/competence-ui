// ** React Imports
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types
import { Users } from 'src/types/User'

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? "http://127.0.0.1:5000" : 'https://api.successsummit.io',
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Request-Headers": "X-Requested-With",
    'Content-Type': 'application/json'
  }
})

export enum UserCompetenciesStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

const initialState = {
  status: UserCompetenciesStatus.IDLE,
  users: [] as Users,
}

export const getUserCompetencies = createAsyncThunk('userCompetencies/getCompetencies', async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/get-users-competencies', {
      headers: {
        "Access-Control-Request-Method": "GET",
      }
    })
    if (response.data.error) {
      return rejectWithValue(response.data.error.message)
    }
    console.log("Users response: ",response.data)
    const users = response.data as Users

    return users
  } catch (e: any) {
    return rejectWithValue(e.message)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserCompetencies.pending, state => {
      state.status = UserCompetenciesStatus.LOADING
    })
    builder.addCase(getUserCompetencies.fulfilled, (state, action) => {
      console.log("Users: ", action.payload)
      state.status = UserCompetenciesStatus.SUCCESS
      state.users = action.payload
    })
    builder.addCase(getUserCompetencies.rejected, state => {
      state.status = UserCompetenciesStatus.FAILURE
    })
  }
})

export default usersSlice.reducer
