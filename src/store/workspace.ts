import {createSlice } from '@reduxjs/toolkit'

interface Workspace {
    name:string,id:string , 
    photoURL:string | null,
    identified:string,
    timezone:string,
    workspaceURL:string
    membersId:{[key:string]:{role:string}} | null
}

const initialState:{
    selectedWorkSpace:Workspace,members:any[] // ordered by invitedAt
    userWorkspaces:{[key:string]:Workspace}
    } = {
   selectedWorkSpace:{name:'Loading Workspace' , id:'', photoURL:null,membersId:null,
   identified:'MFWU' , 
   timezone:'' , 
   workspaceURL:'myfirstUnloaded'},userWorkspaces:{},members:[]
} 






export const workspaceSlice = createSlice({
    name:'workspace',
    initialState,
    reducers:{

        changeSelectedWorkSpace:(state,action)=>{
         
            state.selectedWorkSpace = action.payload
         
        },
        changeUserWorkspaces:(state,action)=>{
            state.userWorkspaces = action.payload
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

export const { changeSelectedWorkSpace, loadMembersToStore,updateOneMember , changeUserWorkspaces} = workspaceSlice.actions

export default workspaceSlice.reducer