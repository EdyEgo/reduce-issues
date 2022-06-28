import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import teamReducer from "./team";
import workspaceReducer from "./workspace";
import usersReducer from "./users";
import issuesReducer from "./issues";
import selectedTabReducer from "./selectedTab";
import filtersIssuesReducer from "./filtersIssues";
import profileReducer from "./profile";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    workspace: workspaceReducer,
    users: usersReducer,
    issues: issuesReducer,
    profile: profileReducer,
    selectedTab: selectedTabReducer,
    filtersIssues: filtersIssuesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // a lot of the app data it's non-serializable so this setting is for
      // not showing warnings
    }),
});
