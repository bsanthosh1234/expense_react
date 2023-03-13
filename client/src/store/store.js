import { configureStore } from '@reduxjs/toolkit'
import { expenseSlice } from './reducer'
import globalSetter from "../reducers/globalStates";
import apiSlice from './apiSlice'

export const store = configureStore({
  reducer: {
    expense:expenseSlice,
    [apiSlice.reducerPath]:apiSlice.reducer,
    globalStates: globalSetter


  },
  middleware:getDefaultMiddleware =>getDefaultMiddleware().concat(apiSlice.middleware)
})