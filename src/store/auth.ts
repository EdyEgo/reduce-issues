import {createSlice} from '@reduxjs/toolkit'
import {signUp} from '../api/dataBaseAuthMethods'

const initialState:{user:null | {email:string,uid:string}, unsubscribe:null | (()=>void),error:null | string} = {
    user:{email:'prodan',uid:'heyheyehey'},unsubscribe:null,error:null 
    // topping:null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
       changeUserStatus:(state,action)=>{
           
         state.user = action.payload
       },
       changeUnsubscribeStatus:(state,action)=>{
          if(typeof state.unsubscribe === 'function') state.unsubscribe()
          state.unsubscribe = action.payload
       },
       changeErrorStatus:(state,action)=>{
           state.error = action.payload
       }
    }
})

export const {changeUserStatus,changeUnsubscribeStatus,changeErrorStatus} = authSlice.actions

export default authSlice.reducer