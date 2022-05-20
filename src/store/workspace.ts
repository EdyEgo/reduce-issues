import {createSlice } from '@reduxjs/toolkit'

const initialState:{
    selectedWorkSpace:{
        name:string,id:string , 
        logoURL:string,
        identified:string,
        timezone:string,
        workspaceURL:string},members:any[] // ordered by invitedAt
    
    } = {
   selectedWorkSpace:{name:'My First Work Space' , id:'', logoURL:'',
   identified:'MFW' , 
   timezone:'' , 
   workspaceURL:'myfirst'},members:[]
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