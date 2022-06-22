import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  selectedTeam: any;
  teamList: { [key: string]: any }[] | [];
} = {
  selectedTeam: { name: "My First Team", id: "" },
  teamList: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    changeSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    }, // we don t have a selected team future

    setTeamList: (state, action) => {
      state.teamList = action.payload;
    },
    deleteTeamList: (state) => {
      state.teamList = [];
    },
    deleteTeamFromList: (state, action) => {
      const { teamId } = action.payload;
      delete state.teamList[teamId];
    },
    updateATeam: (state, action) => {
      const { newTeamId, newTeamObject } = action.payload;
      state.teamList[newTeamId] = newTeamObject;
    },
    updateATeamName(state, { payload }) {
      const teamId = payload.teamId;
      const newName = payload.newName;
      const teamFoundedIndex = state.teamList.findIndex(
        (teamObject) => teamObject.id === teamId
      );

      const copyTeamList = [...state.teamList];
      copyTeamList.splice(teamFoundedIndex, 1, {
        ...copyTeamList[teamFoundedIndex],
        name: newName,
      });

      state.teamList = copyTeamList;
    },
    updateATeamIdentified(state, { payload }) {
      const teamId = payload.teamId;
      const newIdentified = payload.newIdentified;
      const teamFoundedIndex = state.teamList.findIndex(
        (teamObject) => teamObject.id === teamId
      );

      const copyTeamList = [...state.teamList];
      copyTeamList.splice(teamFoundedIndex, 1, {
        ...copyTeamList[teamFoundedIndex],
        identified: newIdentified,
      });
      console.log("bruh", copyTeamList);

      state.teamList = copyTeamList;
    },
  },
});

export const {
  changeSelectedTeam,
  setTeamList,
  deleteTeamList,
  updateATeam,
  deleteTeamFromList,
  updateATeamName,
  updateATeamIdentified,
} = teamSlice.actions;

export default teamSlice.reducer;
