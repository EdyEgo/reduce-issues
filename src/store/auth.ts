import {createSlice} from '@reduxjs/toolkit'

const initialState:{user:null | {email:string,uid:string}, topping:any} = {
    user:{email:'prodan',uid:'heyheyehey'},
    topping:null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
       fakeLogin:(state)=>{
           state.user = {email:'damn.son@gmail.com',uid:'where did ya find this'}
       },
       addTopping:(state,action)=>{
        //    action.type
    state.topping = [...state.topping,action.payload]
       }
    }
})

export const {addTopping,fakeLogin} = authSlice.actions

export default authSlice.reducer