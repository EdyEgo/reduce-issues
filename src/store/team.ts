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
    // extraReducers:(builder)=>{
         
    //     //user signed Up -->
    //      builder.addCase(signUserUp.fulfilled,(state,action)=>{
    //         if(!action.payload.error){
    //             state.user = action.payload.data
    //            return 
    //         }
    //         state.error = action.payload.message
    //      })

    //     // user signed Up <--
    // },
})

export const { } = teamSlice.actions

export default teamSlice.reducer