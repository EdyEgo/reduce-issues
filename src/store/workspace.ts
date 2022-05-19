import {createSlice } from '@reduxjs/toolkit'

const initialState:{selectedWorkSpace:{name:string}} = {
   selectedWorkSpace:{name:'My First Work Space'}
} 




// export const signUserUp = createAsyncThunk('auth/signUserUp',async(userObject:userObject,thunkAPI)=>{
//    const response = await signUp(userObject)
//    return response
// })

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