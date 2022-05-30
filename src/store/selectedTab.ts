import {createSlice } from '@reduxjs/toolkit'

interface selectedTabAppAreaTypes {
    active:boolean
    link:string,workspaceId:string,
    teamId:null | string,
    isFavorites:boolean,
    isSettings:boolean,
    isMyIssues:boolean
}
interface selectedTabClientAreaTypes{
    link:string,active:boolean
}

const initialState:{selectedTabAppArea:selectedTabAppAreaTypes,
    selectedTabClientArea:selectedTabClientAreaTypes} = 
    {
   selectedTabAppArea:{active:false,link:'/',workspaceId:'',teamId:null,isFavorites:false,isSettings:false,isMyIssues:false},
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
       changeTabAreaStaticTabSelection:(state,{payload})=>{
        state.selectedTabAppArea.isFavorites = false
        state.selectedTabAppArea.isMyIssues = false
        state.selectedTabAppArea.isSettings = false
        const staticTabName:"isFavorites" | "isMyIssues" | "isSettings"= payload.name 
        
        state.selectedTabAppArea[staticTabName] = true
       }
        
      
      
    },

})

export const { changeSelectedTabAppAreaActiveStatus,changeSelectedTabClientAreaActiveStatus,
    changeSelectedTabClientAreaLink,changeSelectedTabAppAreaLink,changeTabAreaStaticTabSelection } = selectedTabSlice.actions

export default selectedTabSlice.reducer