import {createSlice } from '@reduxjs/toolkit'

const initialState:{selectedTeam:{name:string}} = {
   selectedTeam:{name:'My First Team'}
} 




// export const signUserUp = createAsyncThunk('auth/signUserUp',async(userObject:userObject,thunkAPI)=>{
//    const response = await signUp(userObject)
//    return response
// })

export const teamSlice = createSlice({
    name:'team',
    initialState,
    reducers:{

        changeSelectedTeam:(state,action)=>{
            state.selectedTeam = action.payload
        }
      
      
    },

})

export const { changeSelectedTeam } = teamSlice.actions

export default teamSlice.reducer