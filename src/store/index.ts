import {configureStore} from  '@reduxjs/toolkit'
import authReducer from './auth'
import teamReducer from './team'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        team:teamReducer
    }
})

