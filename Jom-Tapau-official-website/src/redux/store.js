import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userSlice from './User/userSlice'

export const store = configureStore({
    reducer:{
        user:userSlice
    }
})