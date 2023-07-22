// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import compentencies from 'src/store/competencies'

export const store = configureStore({
  reducer: {
    compentencies
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
