import { createSlice } from "@reduxjs/toolkit";

interface Workspace {
  name: string;
  id: string;
  photoURL: string | null;
  identified: string;
  timezone: string;
  workspaceURL: string;
  membersId: { [key: string]: { role: string } } | null;
}

const initialState: {
  selectedWorkSpace: Workspace;
  members: any[]; // ordered by invitedAt

  userWorkspaces: { [key: string]: Workspace };
} = {
  selectedWorkSpace: {
    name: "Loading Workspace",
    id: "",
    photoURL: null,
    membersId: null,
    identified: "MFWU",
    timezone: "",
    workspaceURL: "myfirstUnloaded",
  },

  userWorkspaces: {},
  members: [],
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    clearWorkspaceMemory(state) {
      state.members = [];
      state.selectedWorkSpace = {
        name: "Loading Workspace",
        id: "",
        photoURL: null,
        membersId: null,
        identified: "MFWU",
        timezone: "",
        workspaceURL: "myfirstUnloaded",
      };
      state.userWorkspaces = {};
    },
    changeSelectedWorkSpace: (state, action) => {
      state.selectedWorkSpace = action.payload;
    },
    deleteUserWorkspace(state, { payload }) {
      // if the deleted workspace is the selected workspace than first change the selected workspace

      const selectedWorkspaceId = payload.selectedWorkspaceId;
      // if (
      //   selectedWorkspaceId != null &&
      //   state.selectedWorkSpace.id != null &&
      //   selectedWorkspaceId === state.selectedWorkSpace.id
      // ) {
      //   // select another workspace if the deleted one is the selected one
      //   for (const currentWorkspaceId in state.userWorkspaces) {
      //     const currentWorkspaceObject =
      //       state.userWorkspaces[currentWorkspaceId];
      //     if (currentWorkspaceObject.id === selectedWorkspaceId) {
      //       continue;
      //     }
      //     if (currentWorkspaceObject.id !== selectedWorkspaceId) {
      //       state.selectedWorkSpace = currentWorkspaceObject;
      //       break;
      //     }
      //   }
      // }
      // delete the workspace from store

      const copyUserWorkspaces = { ...state.userWorkspaces };
      delete copyUserWorkspaces[selectedWorkspaceId];
      state.userWorkspaces = copyUserWorkspaces;
    },

    updateSelectedWorkspaceName(state, { payload }) {
      const newName = payload.newName;
      state.selectedWorkSpace = { ...state.selectedWorkSpace, name: newName };
    },
    updateSelectedWorkspaceURL(state, { payload }) {
      const newURL = payload.newURL;
      state.selectedWorkSpace = {
        ...state.selectedWorkSpace,
        workspaceURL: newURL,
      };
    },
    changeUserWorkspaces: (state, action) => {
      state.userWorkspaces = action.payload;
    },
    loadMembersToStore: (state, action) => {
      state.members = action.payload;
    },
    updateOneMember: (state, action) => {
      const { memberId, updatedMember } = action.payload;
      const indexOfMemberById = state.members.indexOf({ id: memberId });
      if (indexOfMemberById === -1) return;
      state.members[indexOfMemberById] = updatedMember;
    },
    addMemberToWorkspace(state, { payload }) {
      const userId = payload.userId;
      const userValue = payload.userValue;
      state.members.push(userValue);

      const copySelectedWorkspace = { ...state.selectedWorkSpace };
      if (copySelectedWorkspace.membersId == null)
        copySelectedWorkspace.membersId = {};
      copySelectedWorkspace.membersId[userId] = userValue;
      state.selectedWorkSpace = copySelectedWorkspace;
    },
    removeMemberFromWorkspace(state, { payload }) {
      // unused for now
      const userId = payload.userId;

      const foundMemberIndex = state.members.findIndex(
        (member) => member.id === userId
      );
      if (foundMemberIndex !== -1) {
        const copyMembersList = [...state.members];
        copyMembersList.splice(foundMemberIndex, 1);
        state.members = copyMembersList;
      }
      const copySelectedWorkspace = { ...state.selectedWorkSpace };
      if (
        copySelectedWorkspace.membersId != null &&
        copySelectedWorkspace.membersId[userId] != null
      ) {
        delete copySelectedWorkspace.membersId[userId];
        state.selectedWorkSpace = copySelectedWorkspace;
      }
    },
  },
});

export const {
  clearWorkspaceMemory,
  changeSelectedWorkSpace,
  deleteUserWorkspace,
  addMemberToWorkspace,
  removeMemberFromWorkspace,
  updateSelectedWorkspaceName,
  updateSelectedWorkspaceURL,
  loadMembersToStore,
  updateOneMember,
  changeUserWorkspaces,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
