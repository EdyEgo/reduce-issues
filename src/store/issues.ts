import {createSlice } from '@reduxjs/toolkit'

interface TeamIssues{[key:string]:{[key:string]:any}[]}



const initialState:{teamsIssues:TeamIssues,newIssueModalOpenStatus:boolean} = {
    teamsIssues:{},newIssueModalOpenStatus:false
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
        addIssuesToOneTeam:(state,action)=>{
            const teamId = action.payload.id
            state.teamsIssues[teamId] = action.payload.data
        },
        removeOneIssueToTeam:(state,action)=>{
            const teamId = action.payload.teamId
            const issueId = action.payload.issueId
           const issueToRemoveId =  state.teamsIssues[teamId].findIndex((issue)=>issue.id === issueId)
           state.teamsIssues[teamId].splice(issueToRemoveId,1)
        },
        changenewIssueModalOpenStatus:(state,action)=>{
            state.newIssueModalOpenStatus = action.payload
        }
      
    },

})

export const { loadTeamsIssues ,changeOneTeamIssues,addIssuesToOneTeam,addOneIssueToTeam,removeOneIssueToTeam , changenewIssueModalOpenStatus} = usersSlice.actions

export default usersSlice.reducer