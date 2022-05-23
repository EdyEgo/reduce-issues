import {configureStore} from  '@reduxjs/toolkit'
import authReducer from './auth'
import teamReducer from './team'
import workspaceReducer  from './workspace' 
import usersReducer from './users'
import issuesReducer from './issues'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        team:teamReducer,
        workspace:workspaceReducer,
        users:usersReducer,
        issues:issuesReducer
    }
})

