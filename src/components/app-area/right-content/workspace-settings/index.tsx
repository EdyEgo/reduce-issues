import SnackBarCRUDInfo from "../../../../composables/info-popovers/snackbar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  deleteWorkspace,
  changeSelectedWorkspace as changeSelectedWorkspaceApi,
} from "../../../../api/dataBaseWorkSpaceMethods";
import {
  deleteOneTeam,
  getTeams,
  deleteOneTeamWithIssues,
} from "../../../../api/dataBaseTeamsMethods";
import { getUsers } from "../../../../api/dataBaseUsersMethods";

import {
  updateSelectedWorkspaceName as updateSelectedWorkspaceNameStore,
  updateSelectedWorkspaceURL as updateSelectedWorkspaceURLStore,
  loadMembersToStore,
} from "../../../../store/workspace";
import { deleteOneTeamFromTeamList, setTeamList } from "../../../../store/team";

import {
  deleteUserWorkspace,
  changeSelectedWorkSpace,
  changeSelectedWorkSpace as changeSelectedWorkSpaceStore,
} from "../../../../store/workspace";
import { changeCurrentUser } from "../../../../store/users";

import Modal from "@mui/material/Modal";

import DangerDeleteIssue from "@mui/icons-material/ReportProblemSharp";
import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";
import LinearProgress from "@mui/material/LinearProgress";

import Typography from "@mui/material/Typography";

interface WorkspaceSettingsProps {}

const WorkspaceSettings: React.FC<WorkspaceSettingsProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const workspaces = useSelector(
    (state: any) => state.workspace.userWorkspaces
  );
  const authUser = useSelector((state: any) => state.auth.user);
  const teamList = useSelector((state: any) => state.team.teamList);
  const userWorkspaces = useSelector(
    (state: any) => state.workspace.userWorkspaces
  );
  const teamIssuesList = useSelector((state: any) => state.issues.teamsIssues);
  const usersList: any[] = useSelector((state: any) => state.workspace.members);
  const currentUser = useSelector((state: any) => state.users.currentUser);
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

  // modal

  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [deleteLoginModalStatus, setDeleteLoginModalStatus] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<null | string>(
    null
  );
  async function getCurrentSelectedWorkspaceAndSave(
    workspaceId: string,
    userWorkspace: { [key: string]: any }
  ) {
    const selectedWorkspaceObject = {
      ...userWorkspace[workspaceId],
      id: workspaceId,
    };
    dispatch(changeSelectedWorkSpace({ ...selectedWorkspaceObject }));
    return selectedWorkspaceObject;
  }

  async function getCurrentTeamListForWorkspace(workspaceId: string) {
    const document = await getTeams(workspaceId);
    if (document.error) throw new Error(document.message);
    const teamData = document.data;

    dispatch(setTeamList(teamData));
    return teamData;
  }

  async function getSelectedWorkspaceMembersAndSave(usersIds: {
    [key: string]: any;
  }) {
    // load from db/users all members in this workspace

    const members = await getUsers({ usersIds });
    if (members.error) throw new Error(members.message);
    const teamMembersList = members.data;
    dispatch(loadMembersToStore(teamMembersList));
  }

  async function changeSelectedWorkspaceById(selectedWorkspaceId: string) {
    const result = await changeSelectedWorkspaceApi(
      selectedWorkspaceId,
      authUser.uid
    );

    if (result?.error) {
      return null;
    }
    // change current user
    dispatch(
      changeCurrentUser({
        ...currentUser,
        workSpaceSelected: { id: selectedWorkspaceId },
      })
    );
    // this part is not gonna be needed once you make the routes right ----->
    const collectionUserWorkspace = workspaces;
    const workspaceData = await getCurrentSelectedWorkspaceAndSave(
      selectedWorkspaceId,
      collectionUserWorkspace
    );
    // load team data from workspace nested collection
    await getCurrentTeamListForWorkspace(selectedWorkspaceId);
    // load members list from data base in users collection
    await getSelectedWorkspaceMembersAndSave(workspaceData.membersId);

    const newWorkspaceSelected = workspaces[selectedWorkspaceId];
    dispatch(changeSelectedWorkSpaceStore(newWorkspaceSelected));
    // see if the teams are loaded and the issues
    console.log("delete this in the future");
    //this part is not gonna be needed once you make the routes right <-----
  }

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

  function selectTheNextWorkspaceAvailable(selectedWorkspaceId: string) {
    // if none return null and don t allow the user to delete the workspace
    let selectedWorkSpace = null;
    for (const currentWorkspaceId in userWorkspaces) {
      const currentWorkspaceObject = userWorkspaces[currentWorkspaceId];
      if (currentWorkspaceObject.id === selectedWorkspaceId) {
        continue;
      }
      if (currentWorkspaceObject.id !== selectedWorkspaceId) {
        selectedWorkSpace = currentWorkspaceObject;
        break;
      }
    }
    return selectedWorkSpace;
  }

  async function deleteWorkspaceFunc() {
    const teamsThatWereNotDeleted: any = [];
    const newWorkspaceAvailableForBeeingSelected =
      selectTheNextWorkspaceAvailable(selectedWorkspace.id);

    if (newWorkspaceAvailableForBeeingSelected === null) {
      setDeleteErrorMessage("You gotta have at least another workspace!");

      setTimeout(() => {
        setDeleteErrorMessage(null);
      }, 3000);
      return;
    }
    // setDisabledRequestButton , setDeleteErrorMessage,setDeleteLoginModalStatus,
    setDisabledRequestButton(true);
    setDeleteLoginModalStatus(true);
    await Promise.all(
      teamList.map(async (teamObject: any) => {
        if (
          selectedWorkspace?.id != null &&
          teamObject?.workspaceId != null &&
          teamObject.workspaceId === selectedWorkspace.id
        ) {
          const extractTeamIssues = teamIssuesList[teamObject.id];
          const isTeamHaveingIssues = extractTeamIssues.length >= 1;

          if (isTeamHaveingIssues) {
            // delete the team with his issues
            const { error } = await deleteOneTeam({
              issuesWithRefs: extractTeamIssues,
              teamId: teamObject.id,
              workspaceId: selectedWorkspace.id,
            });
            if (!error) {
              dispatch(deleteOneTeamFromTeamList({ teamId: teamObject.id }));
            }
            if (error) {
              teamsThatWereNotDeleted.push(teamObject);
              console.log(`Could not delete ${teamObject.name} team`);
            }
          }
          if (!isTeamHaveingIssues) {
            const { error } = await deleteOneTeamWithIssues({
              teamId: teamObject.id,
              workspaceId: selectedWorkspace.id,
            });
            if (!error) {
              teamsThatWereNotDeleted.push(teamObject);
              dispatch(deleteOneTeamFromTeamList({ teamId: teamObject.id }));
            }
            if (error) {
              console.log(`Could not delete ${teamObject.name} team`);
            }
          }
        }
      })
    );
    if (teamsThatWereNotDeleted.length >= 1) {
      console.log("Could not delete this teams", teamsThatWereNotDeleted);
    }
    // delete workspace and maybe delete the fields from the users that contain that workspace
    // change the selected workspace to the next one available after you are deleteing this one , update the store

    const { error } = await deleteWorkspace({
      workspaceRef: selectedWorkspace.workspaceRef,
    });
    setDisabledRequestButton(false);
    setDeleteLoginModalStatus(false);
    if (error) {
      // set login , close modal , activate buttons , set error message
      setDeleteErrorMessage("Could not delete the workspace");

      setTimeout(() => {
        setDeleteErrorMessage(null);
      }, 3000);
      return;
    }
    setDeleteModalStatus(false);

    // change the selected workspace in database

    // change the selected workspace in store
    /// newWorkspaceAvailableForBeeingSelected
    changeSelectedWorkspaceById(newWorkspaceAvailableForBeeingSelected.id);

    dispatch(
      deleteUserWorkspace({ selectedWorkspaceId: selectedWorkspace.id })
    );
    // redirect at my issues after
    navigate("/reduce-issues");
  }

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
                  <div className="delete-workspace">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setDeleteModalStatus(true);
                      }}
                      style={{
                        backgroundColor: "rgb(156, 39, 176)",
                        fontWeight: 600,
                        color: "white",
                      }}
                    >
                      Delete workspace
                    </Button>
                  </div>
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

      <Modal
        open={deleteModalStatus}
        onClose={() => {
          setDeleteModalStatus(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid white",
            boxShadow: 24,
            p: 3,
          }}
        >
          {deleteLoginModalStatus && (
            <Stack
              sx={{
                width: "100%",
                color: "grey.500",
                visibility: "visible",
              }}
              spacing={2}
            >
              <LinearProgress color="success" />
            </Stack>
          )}
          {deleteLoginModalStatus === false && (
            <Stack
              sx={{
                width: "100%",
                color: "grey.500",
                visibility: "hidden",
              }}
              spacing={2}
            >
              <LinearProgress color="success" />
            </Stack>
          )}
          <div className="container">
            <div className="flex justify-center my-2">
              <DangerDeleteIssue className="text-red-500" />
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this workspace ?
            </Typography>
            <Typography
              style={{ marginTop: "1em", color: "red" }}
              id="modal-modal-title"
              variant="subtitle2"
              component="h2"
            >
              This operation is irreversible and will result in a complete
              deletion of all the data associated with the workspace!
            </Typography>
            {deleteErrorMessage != null && (
              <div className="text-center text-red-500 visible">
                Could not delete the workspace
              </div>
            )}
            {deleteErrorMessage == null && (
              <div className="text-center text-red-500 invisible">
                placeholder
              </div>
            )}
            <div className="flex justify-between m-2 mt-4">
              <Button
                onClick={() => {
                  deleteWorkspaceFunc();
                }}
                style={{
                  color: "rgb(211,47,47)",
                  borderColor: "rgb(211,47,47)",
                }}
                disabled={deleteLoginModalStatus}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                disabled={deleteLoginModalStatus}
                variant="contained"
                color="success"
                onClick={() => {
                  setDeleteModalStatus(false);
                }}
              >
                Keep
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default WorkspaceSettings;
