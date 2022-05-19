import {createSlice } from '@reduxjs/toolkit'

const initialState:{
    selectedWorkSpace:{
        name:string,id:string , 
        logoURL:string,
        identified:string,
        timezone:string,
        workspaceURL:string}} = {
   selectedWorkSpace:{name:'My First Work Space' , id:'', logoURL:'',
   identified:'MFW' , 
   timezone:'' , 
   workspaceURL:'myfirst'}
} 






export const workspaceSlice = createSlice({
    name:'team',
    initialState,
    reducers:{

        changeSelectedWorkSpace:(state,action)=>{
            state.selectedWorkSpace = action.payload
        }
      
      
    },

})

export const { changeSelectedWorkSpace } = workspaceSlice.actions

export default workspaceSlice.reducer