import {createSlice } from '@reduxjs/toolkit'

const initialState:{selectedTeam:{name:string,id:string},teamList:{[key:string]:any}} = {
   selectedTeam:{name:'My First Team',id:''},teamList:{}
} 






export const teamSlice = createSlice({
    name:'team',
    initialState,
    reducers:{

        changeSelectedTeam:(state,action)=>{
            state.selectedTeam = action.payload
        },

        setTeamList:(state,action)=>{
          
            state.teamList = action.payload
           
        },
        deleteTeamList:(state)=>{
            state.teamList = []
        },
        deleteTeamFromList:(state,action)=>{
            const {teamId} = action.payload
            delete state.teamList[teamId]
        },
        updateATeam:(state,action)=>{
            const {newTeamId,newTeamObject} = action.payload
            state.teamList[newTeamId] = newTeamObject
        }
      
      
    },

})

export const { changeSelectedTeam , setTeamList, deleteTeamList , updateATeam ,deleteTeamFromList} = teamSlice.actions

export default teamSlice.reducer