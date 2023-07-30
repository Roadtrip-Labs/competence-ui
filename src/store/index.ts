// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import users from 'src/store/users'

export const store = configureStore({
  reducer: {
    users
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
