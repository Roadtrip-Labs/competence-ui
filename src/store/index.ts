// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

// ** Reducers
import { usersApi } from './users'
import { usersCompetencyApi } from './usersCompetency'

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [usersCompetencyApi.reducerPath]: usersCompetencyApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      usersApi.middleware,
      usersCompetencyApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production'
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
