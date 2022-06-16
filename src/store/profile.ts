import {createSlice } from '@reduxjs/toolkit'

const initialState:{profileStatus:boolean} = {
   profileStatus:false
} 






export const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{

       changeProfileBarStatus(state){
        state.profileStatus = !state.profileStatus
       }
      
      
    },

})

export const { changeProfileBarStatus} = profileSlice.actions

export default profileSlice.reducer