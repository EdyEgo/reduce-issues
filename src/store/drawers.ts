import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  drawers: {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
  };
  menuType: "menu";
} = {
  drawers: {
    bottom: false,
    left: false,
    right: false,
    top: false,
  },
  menuType: "menu",
};

export const drawersSlice = createSlice({
  name: "drawers",
  initialState,
  reducers: {
    changeDrawerStateByDirectionId: (state, { payload }) => {
      const direction: "left" | "right" | "bottom" | "top" = payload.direction;
      const newStatus: boolean = payload.newStatus;
      state.drawers = { ...state.drawers, [direction]: newStatus };
    },
  },
});

export const { changeDrawerStateByDirectionId } = drawersSlice.actions;

export default drawersSlice.reducer;
