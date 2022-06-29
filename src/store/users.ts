import { createSlice } from "@reduxjs/toolkit";

const initialState: { currentUser: null | any } = {
  currentUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearCurrentUser(state) {
      state.currentUser = null;
    },
    changeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { clearCurrentUser, changeCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
