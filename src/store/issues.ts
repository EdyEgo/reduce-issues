import {createSlice } from '@reduxjs/toolkit'

interface TeamIssues{[key:string]:{[key:string]:any}[]}

//showViewOptions types
// priority:boolean,
// issueIdentified:boolean,
// status:boolean,
// label:boolean,
// dueDate:boolean,
// createdAt:boolean,
// updatedAt:boolean,
// assignee:boolean

const initialState:{teamsIssues:TeamIssues,availableFilters:any,showViewOptions:{[key:string]:boolean},
grouping:string,// can be status , priority,assignee , no grouping
      newIssueModalOpenStatus:boolean,teamIssuesSubscriptions:(()=>void)[]} = {
    teamsIssues:{},availableFilters:{},//incomplete for now ,the idea is to show only filters that are available in your issues
    showViewOptions:{assignee:true,
        createdAt:true,dueDate:true,issueIdentified:true,
        label:true,priority:true,status:true,updatedAt:true},
    grouping:"status",
    newIssueModalOpenStatus:false,
    teamIssuesSubscriptions:[]
} 






export const usersSlice = createSlice({
    name:'issues',
    initialState,
    reducers:{

        changeGrouping(state,action){
            state.grouping = action.payload
        },
        changeShowViewOption(state,action){
            const selectedViewOption:string =  action.payload.name
            state.showViewOptions[selectedViewOption] = !state.showViewOptions[selectedViewOption]
        },

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
        addSubscription:(state,action)=>{
            const unsub:()=>void = action.payload
             state.teamIssuesSubscriptions.push(unsub)
        },
        removeSubscriptions:(state)=>{ // for now we don't need to remove an individual subscription
              if(state.teamIssuesSubscriptions.length <= 0) return
              state.teamIssuesSubscriptions.forEach((unsub)=>{
                unsub()
              })
              state.teamIssuesSubscriptions = []
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

export const {changeGrouping,changeShowViewOption, loadTeamsIssues,addSubscription, removeSubscriptions,changeOneTeamIssues,addIssuesToOneTeam,addOneIssueToTeam,
    removeOneIssueToTeam , changenewIssueModalOpenStatus} = usersSlice.actions

export default usersSlice.reducer