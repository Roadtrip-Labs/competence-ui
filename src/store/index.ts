// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

// ** Reducers
import { usersApi } from 'src/store/users'

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(usersApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
