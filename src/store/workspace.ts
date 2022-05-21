import {createSlice } from '@reduxjs/toolkit'

const initialState:{
    selectedWorkSpace:{
        name:string,id:string , 
        photoURL:string | null,
        identified:string,
        timezone:string,
        workspaceURL:string},members:any[] // ordered by invitedAt
    
    } = {
   selectedWorkSpace:{name:'Mt First Work Space unlodaded' , id:'', photoURL:null,
   identified:'MFWU' , 
   timezone:'' , 
   workspaceURL:'myfirstUnloaded'},members:[]
} 






export const workspaceSlice = createSlice({
    name:'team',
    initialState,
    reducers:{

        changeSelectedWorkSpace:(state,action)=>{
            state.selectedWorkSpace = action.payload
        },
        loadMembersToStore:(state,action)=>{
            state.members = action.payload
        },
        updateOneMember:(state,action)=>{
            const {memberId,updatedMember} = action.payload
            const indexOfMemberById = state.members.indexOf({id:memberId})
            if(indexOfMemberById === -1) return
            state.members[indexOfMemberById] = updatedMember
        }
      
      
    },

})

export const { changeSelectedWorkSpace, loadMembersToStore,updateOneMember } = workspaceSlice.actions

export default workspaceSlice.reducer