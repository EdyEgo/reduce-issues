import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {signUp} from '../api/dataBaseAuthMethods'

const initialState: {
  user: null | any;
  selectedTeam: string;
  unsubscribe: null | (() => void);
  error: null | string;
} = {
  user: { email: null, uid: null },
  selectedTeam: "",
  unsubscribe: null,
  error: null,
};

// interface userObject {
//     email:string,
//     firstName:string,
//     lastName:string,
//     password:string
// }

// export const signUserUp = createAsyncThunk('auth/signUserUp',async(userObject:userObject,thunkAPI)=>{
//    const response = await signUp(userObject)
//    return response
// })

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUserStatus: (state, action) => {
      state.user = action.payload;
    },
    changeUnsubscribeStatus: (state, action) => {
      if (typeof state.unsubscribe === "function") state.unsubscribe();
      state.unsubscribe = action.payload;
    },
    changeErrorStatus: (state, action) => {
      state.error = action.payload;
    },
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
});

export const { changeUserStatus, changeUnsubscribeStatus, changeErrorStatus } =
  authSlice.actions;

export default authSlice.reducer;
