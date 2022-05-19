import {configureStore} from  '@reduxjs/toolkit'
import authReducer from './auth'
import teamReducer from './team'
import workspaceReducer  from './workspace' 
import usersReducer from './users'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        team:teamReducer,
        workspace:workspaceReducer,
        users:usersReducer
    }
})

