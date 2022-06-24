import SnackBarCRUDInfo from "../../../../composables/info-popovers/snackbar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import moment from "moment";
import Avatar from "@mui/material/Avatar";
import AvatarPlaceholder from "@mui/icons-material/AccountCircle";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import {
  updateWorkspaceName,
  updateWorkspaceURL,
} from "../../../../api/dataBaseWorkSpaceMethods";
import { deleteOneTeam } from "../../../../api/dataBaseTeamsMethods";

import {
  updateSelectedWorkspaceName as updateSelectedWorkspaceNameStore,
  updateSelectedWorkspaceURL as updateSelectedWorkspaceURLStore,
} from "../../../../store/workspace";
import { deleteOneTeamFromTeamList } from "../../../../store/team";

interface WorkspaceSettingsProps {}

const WorkspaceSettings: React.FC<WorkspaceSettingsProps> = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: any) => state.auth.user);
  const teamList = useSelector((state: any) => state.team.teamList);
  const teamIssuesList = useSelector((state: any) => state.issues.teamsIssues);
  const usersList: any[] = useSelector((state: any) => state.workspace.members);

  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );

  const [workspaceInputName, setWorkspaceInputName] = useState(
    selectedWorkspace?.name
  );
  const [workspaceInputUrl, setWorkspaceInputUrl] = useState(
    selectedWorkspace?.workspaceURL
  );

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (selectedWorkspace?.name != null) {
        setWorkspaceInputName(selectedWorkspace.name);
      }
      if (selectedWorkspace?.workspaceURL != null) {
        setWorkspaceInputUrl(selectedWorkspace.workspaceURL);
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [selectedWorkspace]);

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpenStatus, setSnackBarOpenStatus] = useState(false);
  const [snackBarSeverityType, setSnackBarSeverityType] = useState<
    "success" | "error" | null
  >(null);

  const [disabledRequestButton, setDisabledRequestButton] = useState(false);
  const [updateNameLogin, setUpdateNameLogin] = useState(false);

  const buttonSx = {
    ...(snackBarSeverityType === "success" && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const showSaveOnNameEdit =
    selectedWorkspace?.name != null &&
    workspaceInputName !== "" &&
    workspaceInputName !== selectedWorkspace.name
      ? true
      : false;

  const showSaveOnURLEdit =
    selectedWorkspace?.workspaceURL != null &&
    workspaceInputUrl !== "" &&
    workspaceInputUrl !== selectedWorkspace.workspaceURL
      ? true
      : false;
  const urlHasSpaces = workspaceInputUrl.indexOf(" ") !== -1; // can t update if true

  function showSaveBtn() {
    const fadeIfUrlHasSpaces = urlHasSpaces ? "opacity-40" : "";
    const classToReturn =
      showSaveOnNameEdit === true || showSaveOnURLEdit === true
        ? `save-changed-name visible  flex ${fadeIfUrlHasSpaces}`
        : "save-changed-name invisible ";
    return classToReturn;
  }

  //   function updateWorkspaceInfo() {}
  ///
  async function updateWorkspaceInfo() {
    // workspaceInputName workspaceInputUrl
    if (
      workspaceInputName === "" ||
      workspaceInputName === null ||
      workspaceInputUrl === "" ||
      workspaceInputUrl === null
    )
      return;

    let updateWorkspaceNameError = null;
    let updateWorkspaceErrorURL = null;

    if (showSaveOnNameEdit) {
      updateWorkspaceNameError = await updateWorkspaceNameFunc();
    }
    if (showSaveOnURLEdit) {
      updateWorkspaceErrorURL = await updateWorkspaceURLFunc();
    }

    setUpdateNameLogin(false);

    if (updateWorkspaceNameError !== null || updateWorkspaceErrorURL !== null) {
      setSnackBarOpenStatus(true);
      setSnackBarSeverityType("error");
      setSnackBarMessage("Could not update the workspace");
      return;
    }
    if (updateWorkspaceNameError === null || updateWorkspaceErrorURL === null) {
      setSnackBarOpenStatus(true);
      setSnackBarSeverityType("success");
      setSnackBarMessage("Workspace  updated");
    }

    if (showSaveOnNameEdit) {
      dispatch(
        updateSelectedWorkspaceNameStore({
          newName: workspaceInputName,
        })
      );
    }

    if (showSaveOnURLEdit) {
      dispatch(
        updateSelectedWorkspaceURLStore({
          newURL: workspaceInputUrl,
        })
      );
    }
  }

  async function updateWorkspaceNameFunc() {
    setUpdateNameLogin(true);
    setDisabledRequestButton(true);
    const { error } = await updateWorkspaceName({
      newName: workspaceInputName,
      workspaceId: selectedWorkspace.id,
    });
    setDisabledRequestButton(false);
    if (!error) return null;
    return error;
  }

  async function updateWorkspaceURLFunc() {
    setUpdateNameLogin(true);
    setDisabledRequestButton(true);
    const { error } = await updateWorkspaceURL({
      newURL: workspaceInputUrl,
      workspaceId: selectedWorkspace.id,
    });
    setDisabledRequestButton(false);
    if (!error) return null;
    return error;
  }

  ////

  function findTeamMemberById(searchedMemberId: string) {
    return usersList.find((userItem: any) => userItem.id === searchedMemberId);
  }

  async function deleteSelectedTeamById(selectedTeamId: string) {
    setUpdateNameLogin(true);
    setDisabledRequestButton(true);
    const { error } = await deleteOneTeam({
      teamId: selectedTeamId,
      issuesWithRefs: teamIssuesList[selectedTeamId],
      workspaceId: selectedWorkspace.id,
    });
    setDisabledRequestButton(false);
    if (error) {
      setSnackBarOpenStatus(true);
      setSnackBarSeverityType("error");
      setSnackBarMessage("Could not update the workspace");
      return;
    }
    if (!error) {
      setSnackBarOpenStatus(true);
      setSnackBarSeverityType("success");
      setSnackBarMessage("Workspace  updated");
      // dispatch changes

      dispatch(deleteOneTeamFromTeamList({ teamId: selectedTeamId }));
    }

    setUpdateNameLogin(false);
  }

  // after delete team i am gonna add delete workspace

  return (
    <div className="workspace-settings-page">
      {selectedWorkspace != null && (
        <div className="content-container">
          <div className="nav-team-settings  p-8">
            <div className="about-container border-b pb-2 ">
              <div className="about-team ">
                <div className="team-name-title flex items-center">
                  <div className="name-changer w-7/12 px-1">
                    <div className="label-t py-2 ml-1">Name</div>
                    <textarea
                      onChange={(event) => {
                        setWorkspaceInputName(event.target.value);
                      }}
                      className="text-2xl w-full  shadow-md  p-2  border overflow-hidden break-words rounded-md resize-none border-gray-200 h-12 transition-all ease-in-out"
                      value={workspaceInputName}
                    ></textarea>
                  </div>

                  <div className="id-container w-6/12 px-1">
                    <div className="py-2 ml-1"> Workspace URL:</div>

                    <textarea
                      onChange={(event) => {
                        // if the url has spaces you can t save
                        setWorkspaceInputUrl(event.target.value.toLowerCase());
                      }}
                      className="text-2xl  w-full shadow-md  p-2  border overflow-hidden break-words rounded-md resize-none border-gray-200 h-12 transition-all ease-in-out"
                      value={workspaceInputUrl}
                    ></textarea>
                  </div>

                  <div className={showSaveBtn()}>
                    <Box sx={{ m: 1, position: "relative" }}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        onClick={() => {
                          if (urlHasSpaces) {
                            return;
                          }
                          updateWorkspaceInfo();
                        }}
                      >
                        {snackBarSeverityType === "success" ? (
                          <CheckIcon />
                        ) : (
                          <SaveIcon />
                        )}
                      </Fab>
                      {updateNameLogin && (
                        <CircularProgress
                          size={68}
                          sx={{
                            color: green[500],
                            position: "absolute",
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                  </div>
                </div>
                <div className="about-this-page text-gray-700 flex justify-between items-center p-3">
                  <div className="title-manage-team">Manage this workspace</div>
                </div>
              </div>
            </div>
          </div>
          <div className="stats-container px-8 ">
            <div className="stats-list text-base gap-y-4">
              {selectedWorkspace.registeredAt != null &&
                selectedWorkspace.registeredAt.nanoseconds > 0 &&
                selectedWorkspace.registeredAt.seconds > 0 && (
                  <div className="created-at-container flex gap-2 my-4">
                    <div className="font-semibold"> Workspace created: </div>
                    <div
                      className="cursor-default hover:text-gray-600"
                      title={`Team created at ${selectedWorkspace.registeredAt.toDate()}`}
                    >
                      {moment(
                        selectedWorkspace.registeredAt.toDate()
                      ).fromNow()}
                    </div>
                  </div>
                )}
              <div className="time-zone gap-2 flex my-4">
                <div className="font-semibold"> Workspace Timezone: </div>
                <div> {selectedWorkspace.timezone} </div>
              </div>

              {selectedWorkspace.membersId != null && (
                <div className="workspace-members-list my-2">
                  <div className="members-list-title text-lg p-1 font-semibold">
                    Workspace members list
                  </div>
                  <div className="list">
                    {Object.entries(selectedWorkspace.membersId).map(
                      (
                        [memberId, memberValue]: [
                          memberId: string,
                          memberValue: any
                        ],
                        index: number
                      ) => {
                        const foundMember = findTeamMemberById(memberId);

                        return (
                          <div key={index} className="">
                            {foundMember != null && (
                              <div className="exists-container flex gap-4 items-center  border-b pb-4 justify-between flex-wrap">
                                <div className="member-details flex gap-2 items-center">
                                  <div className="avatar-container ">
                                    {foundMember?.photoURL != null && (
                                      <Avatar
                                        src={foundMember.photoURL}
                                        sx={{ width: 20, height: 20 }}
                                      />
                                    )}
                                    {foundMember?.photoURL == null && (
                                      <AvatarPlaceholder />
                                    )}
                                  </div>
                                  <div className="name-container gap-2">
                                    <div className="fullp-name flex gap-2">
                                      <div className="firstName">
                                        {foundMember.firstName}
                                      </div>
                                      <div className="lastName">
                                        {foundMember.lastName}
                                      </div>
                                    </div>

                                    <div className="email text-gray-600">
                                      {foundMember.email}
                                    </div>
                                  </div>
                                </div>

                                <div className="invited-at flex  gap-2 text-gray-600">
                                  <div>Added :</div>
                                  <div>
                                    {memberValue?.invitedAt != null &&
                                      memberValue.invitedAt.nanoseconds > 0 &&
                                      memberValue.invitedAt.seconds > 0 &&
                                      moment(
                                        memberValue.invitedAt.toDate()
                                      ).fromNow()}
                                  </div>
                                </div>
                                <div className="role flex gap-2">
                                  <div>Workspace role:</div>
                                  <div>{memberValue.role}</div>
                                </div>

                                <div className="button-remove-container">
                                  <Button
                                    variant="contained"
                                    disabled={disabledRequestButton}
                                    className="button- "
                                  >
                                    {memberValue.role === "Owner" &&
                                    authUser.uid === memberId
                                      ? "Leave"
                                      : "Remove"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {teamList != null && (
                <div className="workspace-teams-list">
                  <div className="title text-lg p-1 font-semibold">
                    Team list
                  </div>
                  <div className="list-container">
                    {Object.entries(teamList).map(
                      ([teamId, teamValue]: any, index: number) => {
                        return (
                          <div
                            className="team-item flex gap-4 items-center my-4   flex-1 flex-wrap border-b pb-4"
                            key={index}
                          >
                            <div className="left-side flex items-center justify-between flex-1">
                              <div className="team-name flex gap-2">
                                <div className="name">Name:</div>
                                <div className="data">
                                  {teamValue.name.length > 15
                                    ? `${teamValue.name.slice(0, 19)}..`
                                    : teamValue.name}
                                </div>
                              </div>
                              <div className="team-identified flex gap-2">
                                <div className="name">ID:</div>
                                <div className="data">
                                  {teamValue.identified}
                                </div>
                              </div>
                              <div className="team-regitered-at flex gap-2 text-gray-600">
                                <div className="name">Added</div>
                                <div className="data">
                                  {teamValue?.registeredAt != null &&
                                    teamValue.registeredAt.nanoseconds > 0 &&
                                    teamValue.registeredAt.seconds > 0 &&
                                    moment(
                                      teamValue.registeredAt.toDate()
                                    ).fromNow()}
                                </div>
                              </div>
                              <div className="team-timezone flex gap-2">
                                <div className="name">Timezone:</div>
                                <div className="data">{teamValue.timezone}</div>
                              </div>
                              <div className="team-issues-number flex gap-2">
                                <div className="name">Issues:</div>
                                <div className="data">
                                  {teamValue?.issuesNumber != null
                                    ? teamValue.issuesNumber
                                    : 0}
                                </div>
                              </div>
                            </div>
                            <div className="right-side">
                              <div className="delete-team">
                                <Button
                                  onClick={() => {
                                    deleteSelectedTeamById(teamValue.id);
                                  }}
                                  color="error"
                                  variant="contained"
                                  disabled={disabledRequestButton}
                                  className="button-delete-team"
                                >
                                  Delete team
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedWorkspace != null && <div className="loading-container"></div>}
      <SnackBarCRUDInfo
        message={snackBarMessage}
        openStatus={snackBarOpenStatus}
        setOpenStatus={setSnackBarOpenStatus}
        setSeverityType={setSnackBarSeverityType}
        severityType={snackBarSeverityType}
      />
    </div>
  );
};

export default WorkspaceSettings;
