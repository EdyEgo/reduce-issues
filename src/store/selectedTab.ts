import {createSlice } from '@reduxjs/toolkit'

interface selectedTabAppAreaTypes {
    active:boolean,
    name:string,// ex : Issues wit isTeamTab: true
    link:string,
    isFavorites:boolean,
    isSettings:boolean,
    isMyIssues:boolean,
    isTeamTab:boolean
}
interface selectedTabClientAreaTypes{
    link:string,active:boolean
}

const initialState:{selectedTabAppArea:selectedTabAppAreaTypes,
    selectedTabClientArea:selectedTabClientAreaTypes} = 
    {
   selectedTabAppArea:{active:false,name:'My Issues',link:'/',isFavorites:false,isSettings:false,isMyIssues:false,isTeamTab:false},
   selectedTabClientArea:{link:'',active:true}
} 






export const selectedTabSlice = createSlice({
    name:'selectedTab',
    initialState,
    reducers:{

        changeSelectedTabAppAreaActiveStatus:(state,{payload})=>{
            state.selectedTabAppArea.active = payload
        },
        changeSelectedTabClientAreaActiveStatus:(state,{payload})=>{
            state.selectedTabClientArea.active = payload
        },
       changeSelectedTabAppAreaLink:(state,{payload})=>{
        state.selectedTabAppArea.link = payload
       },
       changeSelectedTabClientAreaLink:(state,{payload})=>{
        state.selectedTabClientArea.link = payload
       },
       changeSelectedTabAppAreaName:(state,{payload})=>{
        state.selectedTabAppArea.name = payload
       },

       changeTabAreaStaticTabSelection:(state,{payload})=>{
        state.selectedTabAppArea.isFavorites = false
        state.selectedTabAppArea.isMyIssues = false
        state.selectedTabAppArea.isSettings = false
        const staticTabName:"isFavorites" | "isMyIssues" | "isSettings" | "isTeamTab"= payload
        
        state.selectedTabAppArea[staticTabName] = true
       }
        
      
      
    },

})

export const { changeSelectedTabAppAreaActiveStatus,changeSelectedTabAppAreaName,changeSelectedTabClientAreaActiveStatus,
    changeSelectedTabClientAreaLink,changeSelectedTabAppAreaLink,changeTabAreaStaticTabSelection } = selectedTabSlice.actions

export default selectedTabSlice.reducer