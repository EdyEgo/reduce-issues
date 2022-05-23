import {createSlice } from '@reduxjs/toolkit'

interface TeamIssues{[key:string]:{[key:string]:any}[]}



const initialState:{teamsIssues:TeamIssues} = {
    teamsIssues:{}
} 






export const usersSlice = createSlice({
    name:'issues',
    initialState,
    reducers:{

        loadTeamsIssues:(state,action)=>{
            state.teamsIssues = action.payload
        },
        changeOneTeamIssues:(state,action)=>{
           const teamId =  action.payload.id
           if(!state.teamsIssues[teamId]) return 
           state.teamsIssues[teamId] = action.payload
        },
        addOneIssueToTeam:(state,action)=>{
            const teamId = action.payload.id
            state.teamsIssues[teamId].push(action.payload.data)
        },
        removeOneIssueToTeam:(state,action)=>{
            const teamId = action.payload.teamId
            const issueId = action.payload.issueId
           const issueToRemoveId =  state.teamsIssues[teamId].findIndex((issue)=>issue.id === issueId)
           state.teamsIssues[teamId].splice(issueToRemoveId,1)
        },
      
      
    },

})

export const { loadTeamsIssues ,changeOneTeamIssues,addOneIssueToTeam,removeOneIssueToTeam} = usersSlice.actions

export default usersSlice.reducer