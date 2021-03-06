import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  selectedTeam: any;
  teamList: { [key: string]: any }[] | any[];
} = {
  selectedTeam: { name: "My First Team", id: "" },
  teamList: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    decrementIssuesNumber(state, { payload }) {
      const teamId = payload.teamId;
      const copyTeamsList = [...state.teamList];
      const teamFoundedIndex = state.teamList.findIndex(
        (teamObject) => teamObject.id === teamId
      );
      const teamObjectToModify = copyTeamsList[teamFoundedIndex];
      copyTeamsList.splice(teamFoundedIndex, 1, {
        ...teamObjectToModify,
        issuesNumber: teamObjectToModify.issuesNumber - 1,
      });
      state.teamList = copyTeamsList;
    },
    incrementIssuesNumber(state, { payload }) {
      const teamId = payload.teamId;
      const copyTeamsList = [...state.teamList];
      const teamFoundedIndex = state.teamList.findIndex(
        (teamObject) => teamObject.id === teamId
      );
      const teamObjectToModify = copyTeamsList[teamFoundedIndex];
      copyTeamsList.splice(teamFoundedIndex, 1, {
        ...teamObjectToModify,
        issuesNumber: teamObjectToModify.issuesNumber + 1,
      });
      state.teamList = copyTeamsList;
    },
    clearTeamListMemoryOnLogOut(state) {
      state.teamList = [];
    },
    changeSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    }, // we don t have a selected team future

    setTeamList: (state, action) => {
      state.teamList = action.payload;
    },
    addATeamInTeamList(state, { payload }) {
      const teamObject: any = payload.teamObject;
      state.teamList.push(teamObject);
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

      state.teamList = copyTeamList;
    },
    addTeamMember(state, { payload }) {
      const teamMemberId = payload.teamMemberId;
      const teamId = payload.teamId;

      const teamFoundedIndex = state.teamList.findIndex(
        (teamObject) => teamObject.id === teamId
      );

      const copyTeamList = [...state.teamList];
      copyTeamList.splice(teamFoundedIndex, 1, {
        ...copyTeamList[teamFoundedIndex],
        membersId: {
          ...copyTeamList[teamFoundedIndex].membersId,
          [teamMemberId]: { role: "Member", invitedAt: new Date() },
        },
      });

      state.teamList = copyTeamList;
    },
    deleteOneTeamFromTeamList(state, { payload }) {
      const teamId = payload.teamId;
      const teamFoundedIndex = state.teamList.findIndex(
        (teamObject) => teamObject.id === teamId
      );
      const copyTeamList = [...state.teamList];
      if (teamFoundedIndex === -1) return;
      copyTeamList.splice(teamFoundedIndex, 1);
      state.teamList = copyTeamList;
    },
    removeTeamMember(state, { payload }) {
      const teamMemberId = payload.teamMemberId;
      const teamId = payload.teamId;

      const teamFoundedIndex = state.teamList.findIndex(
        (teamObject) => teamObject.id === teamId
      );

      const copyTeamList = [...state.teamList];
      delete copyTeamList[teamFoundedIndex].membersId[teamMemberId];

      state.teamList = copyTeamList;
    },
  },
});

export const {
  changeSelectedTeam,
  incrementIssuesNumber,
  decrementIssuesNumber,
  clearTeamListMemoryOnLogOut,
  setTeamList,
  addATeamInTeamList,
  deleteOneTeamFromTeamList,
  deleteTeamList,
  updateATeam,
  addTeamMember,
  removeTeamMember,
  deleteTeamFromList,
  updateATeamName,
  updateATeamIdentified,
} = teamSlice.actions;

export default teamSlice.reducer;
