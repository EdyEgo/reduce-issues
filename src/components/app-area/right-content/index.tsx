import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addIssuesToOneTeam,
  addSubscription,
  removeSubscriptions,
} from "../../../store/issues";
import { getTeamIssues } from "../../../api/dataBaseIssuesMethods";
import { useState, useEffect } from "react";
import NavBar from "./navbar";
import SearchBar from "./search-bar";
import FilteredIssues from "./filtered-issues";
import ProfileDetails from "./profile-details";
import RedirectToMyIssues from "./RedirectToMyIssues";
import SignleIssuePage from "./issue/single-issue-page";
import TeamSettingsPage from "./team-settings";
import WorkspaceSettignsPage from "./workspace-settings";

import CreateNewWorspace from "./new-workspace/create-workspace";

interface RightSideContentProps {}

const RightSideContent: React.FC<RightSideContentProps> = () => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const dispatch = useDispatch();

  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );
  const teamsList = useSelector((state: any) => state.team.teamList);
  const teamIssues = useSelector((state: any) => state.issues.teamsIssues);
  const profileLeftMenuStatus = useSelector(
    (state: any) => state.profile.profileStatus
  );

  function writeIssuesToOneTeam(
    teamId: string,
    teamIdentified: string,
    data: any,
    unsub: any
  ) {
    // add team subscription
    dispatch(addSubscription(unsub));

    // add team issues
    dispatch(addIssuesToOneTeam({ id: teamId, data, teamIdentified }));
  }

  function callbackIssuesSnapShot({
    error,
    data,
    message,
    teamId,
    teamIdentified,
    unsub,
  }: any) {
    if (error) return;
    setErrorMessage(`Could not get your issues , reason:,${message}`);
    writeIssuesToOneTeam(teamId, teamIdentified, data, unsub);
  }

  function getTeamsIssues() {
    if (selectedWorkspace.id == null || teamsList.length <= 0) return;

    teamsList.forEach((teamObject: { id: string; identified: string }) => {
      console.log("bruh wth,", teamObject.identified);
      getTeamIssues({
        teamId: teamObject.id,
        workspaceId: selectedWorkspace.id,
        callbackDocuments: callbackIssuesSnapShot,
        valuesToIncludeInResult: {
          teamId: teamObject.id,
          teamIdentified: teamObject.identified,
        },
      });
    });
  }

  useEffect(() => {
    let isSubscribed = true;

    // remember to unsub boy
    // and on sign out to unsub

    if (isSubscribed) {
      // unsubscribe(if you have subscriptions)
      dispatch(removeSubscriptions());

      // get issues for all of user(workspace) teams
      getTeamsIssues();
    }

    return () => {
      isSubscribed = false;
    };
  }, [selectedWorkspace, teamsList]);

  return (
    <>
      <div className="content-right">
        {/* <div className="content-right__nav-bar">
        <NavBar/>
       </div> */}

        <div className="content-container">
          <Routes>
            <Route
              path="/addworkspace"
              element={
                <div className="add-workspace-container">
                  <CreateNewWorspace />
                </div>
              }
            />

            <Route
              path="/workspace-stats-and-settings"
              element={<WorkspaceSettignsPage />}
            />

            <Route
              path="*"
              element={
                <div className="placeholder">
                  <RedirectToMyIssues />
                </div>
              }
            />

            <Route
              path="/:workspaceURL/search"
              element={
                <div className="placeholder">
                  <SearchBar />
                  <NavBar />
                  <div className="filtered-issues-container">
                    <FilteredIssues useSearch={true} />
                  </div>
                </div>
              }
            />

            <Route
              path="/:workspaceURL/profile"
              element={
                <div className="placeholder">
                  <NavBar
                    noPlustFilter={true}
                    replaceFilterWithTitle={"My Profile"}
                  />
                  <div className="filtered-issues-container">
                    <FilteredIssues filterMyIssue={true} />
                    {profileLeftMenuStatus === true && <ProfileDetails />}
                  </div>
                </div>
              }
            />

            <Route
              path="/:workspaceURL/filtered-issues"
              element={
                <div className="placeholder">
                  <NavBar
                    noPlustFilter={true}
                    replaceFilterWithTitle={"My Issues"}
                  />
                  <div className="filtered-issues-container">
                    <FilteredIssues filterMyIssue={true} />
                  </div>
                </div>
              }
            />

            <Route
              path="/:workspaceURL/settings/team/:teamURL"
              element={
                <div className="placeholder">
                  <TeamSettingsPage />
                </div>
              }
            />

            <Route
              path="/:workspaceURL/team/:teamURL/all"
              element={
                <div className="placeholder">
                  <NavBar />
                  <div className="filtered-issues-container">
                    <FilteredIssues />
                  </div>
                </div>
              }
            />

            <Route
              path="/:workspaceURL/team/:teamURL/active"
              element={
                <div>
                  <NavBar
                    noPlustFilter={true}
                    replaceFilterWithTitle={"Active Issues"}
                  />
                  <div className="filtered-issues-container">
                    <FilteredIssues filterActiveIssues={true} />
                  </div>
                </div>
              }
            />

            <Route
              path="/:workspaceURL/team/:teamURL/backlog"
              element={
                <div>
                  <NavBar
                    noPlustFilter={true}
                    replaceFilterWithTitle={"Backlog Issues"}
                  />
                  <div className="filtered-issues-container">
                    <FilteredIssues filterBackLogIssues={true} />
                  </div>
                </div>
              }
            />

            <Route
              path="/:workspaceURL/team/:teamURL/:issueIdentified"
              element={
                <div>
                  <SignleIssuePage />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default RightSideContent;
