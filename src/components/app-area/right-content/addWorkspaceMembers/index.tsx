import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SnackBarCRUDInfo from "../../../../composables/info-popovers/snackbar";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Avatar from "@mui/material/Avatar";
import AvatarPlaceholder from "@mui/icons-material/AccountCircle";
// import AddWorkspaceUserIcon from "@mui/icons-material/PersonAddAltOutlined";
import AddWorkspaceUserIcon from "@mui/icons-material/PersonAddAltRounded";
import RemoveWorkspaceUserIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import {
  getUserByEmail,
  addWorkspaceToUserWorkSpaces,
} from "../../../../api/dataBaseUsersMethods";
import {
  addWorkspaceMember,
  removeWorkspaceMember,
} from "../../../../api/dataBaseWorkSpaceMethods";
import {
  addMemberToWorkspace,
  removeMemberFromWorkspace,
} from "../../../../store/workspace";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";

import DangerDeleteIssue from "@mui/icons-material/ReportProblemSharp";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import LinearProgress from "@mui/material/LinearProgress";

import Typography from "@mui/material/Typography";
interface AddWorkspaceMembersProps {}

const AddWorkspaceMembers: React.FC<AddWorkspaceMembersProps> = () => {
  const dispactch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState("");
  const authUser = useSelector((state: any) => state.auth.user);

  const [disabledRequestButton, setDisabledRequestButton] = useState(false);
  const [foundMembers, setFoundMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInvite, setLoadingInvite] = useState(false);
  const [loadingRemove, setloadingRemove] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const [userToRemove, setUserToRemove] = useState<null | any>(null);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [deleteLoginModalStatus, setDeleteLoginModalStatus] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<null | string>(
    null
  );

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpenStatus, setSnackBarOpenStatus] = useState(false);
  const [snackBarSeverityType, setSnackBarSeverityType] = useState<
    "success" | "error" | null
  >(null);

  const usersList: any[] = useSelector((state: any) => state.workspace.members); // add here too :)
  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  ); //selectedWorkspace.membersId compare id with this when searching for members,so you don t have as
  // result an actual workspace member
  const areYouWorkspaceOwner =
    selectedWorkspace?.membersId != null &&
    selectedWorkspace.membersId[authUser.uid].role === "Owner"
      ? true
      : false;

  async function startSearchForNewWorkspaceMembers() {
    const trimedInputValue = searchInputValue.trim();
    if (trimedInputValue === "") return;
    setLoading(true);
    setDisabledRequestButton(true);

    if (!searchInputValue.includes("@")) return;

    const { error, data } = await getUserByEmail(trimedInputValue);
    if (error) {
      setLoading(false);
      setDisabledRequestButton(false);

      setErrorMessage("Could not access database!");

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    setFoundMembers(data);

    setLoading(false);
    setDisabledRequestButton(false);
  }

  async function addFoundMemberToUserWorkspace(userObject: any) {
    // add the workspace to the user workspaces
    //setLoadingInvite
    // add to the selected workspace the id of the user with the role  "member" and invitedAt:new Date()

    setDisabledRequestButton(true);
    setLoadingInvite(true);

    const { error: workspaceError } = await addWorkspaceMember({
      role: "Member",
      userId: userObject.id,
      workspaceId: selectedWorkspace.id,
    });
    if (workspaceError) {
      setDisabledRequestButton(true);
      setLoadingInvite(true);

      setSnackBarOpenStatus(true);
      setSnackBarSeverityType("error");
      setSnackBarMessage("Could not update the workspace");
      return;
    }

    const { error: userError } = await addWorkspaceToUserWorkSpaces({
      role: "Member",
      userId: userObject.id,
      workspaceId: selectedWorkspace.id,
    });

    if (userError) {
      setDisabledRequestButton(true);
      setLoadingInvite(true);

      setSnackBarOpenStatus(true);
      setSnackBarSeverityType("error");
      setSnackBarMessage("Could not add the user");
      return;
    }

    // success update
    setDisabledRequestButton(false);
    setLoadingInvite(false);

    setSnackBarOpenStatus(true);
    setSnackBarSeverityType("success");
    setSnackBarMessage("User added");

    // dispatch store changes

    dispactch(
      addMemberToWorkspace({
        userId: userObject.id,
        userValue: userObject,
      })
    );
  }

  async function removeMemberFromWorkspaceFunction() {
    if (userToRemove?.id == null) return;
    // setDeleteLoginModalStatus,setDeleteErrorMessage
    // use removeMemberFromWorkspace with dispatch
    // setloadingRemove(true)
    setDeleteLoginModalStatus(true);

    // remove workspace nested field from users collection
    const { error } = await removeWorkspaceMember({
      userId: userToRemove.id,
      workspaceId: selectedWorkspace.id,
    });
    if (error) {
      setDeleteErrorMessage(
        "Could not completely remove the user from workspace"
      );
      setDeleteLoginModalStatus(false);
      setTimeout(() => {
        setDeleteErrorMessage(null);
      }, 3000);
      return;
    }

    //dispactch info store
    dispactch(
      removeMemberFromWorkspace({
        userId: userToRemove.id,
        userValue: userToRemove,
      })
    );
    setDeleteModalStatus(false);
    setDeleteLoginModalStatus(false);

    setUserToRemove(null);
  }

  function selectedUserToRemove(userObject: any) {
    setUserToRemove(userObject);
  }
  // make a function to remove workspace members , and to delete the workspace !!!!

  // if it contains an @ then search by email
  return (
    <div className="add-workspace-members-container px-28 mt-10">
      {selectedWorkspace != null && (
        <div className="content-container">
          <div className="nav-team-settings  p-8">
            <div className="about-container border-b pb-2 text-2xl">
              <div className="first-title">Add members to your workspace</div>
              <div className="second-title font-serif text-gray-700 ml-4">
                Add members that are registered to Reduce Issues
              </div>
            </div>
          </div>
          <div className="invite-container px-8 mt-10 ">
            <div className="search-for-members-container">
              <div className="header-title pb-8 text-lg">
                <div className="first-title">Search for a user email</div>
                <div className="second-title font-serif text-gray-700 ml-1">
                  Search for members that are in our database
                </div>
              </div>
              <div className="search-inputs flex gap-10 items-center">
                <div className="input-search-half w-8/12">
                  {/* <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    fullWidth
                  /> */}
                  <textarea
                    onChange={(event) => {
                      setSearchInputValue(event.target.value);
                    }}
                    className="text-2xl w-full h-12 shadow-md   border overflow-hidden break-words rounded-md resize-none border-gray-200 transition-all ease-in-out"
                    value={searchInputValue}
                  ></textarea>
                </div>
                <div className="submit-search-half h-12">
                  <LoadingButton
                    disabled={disabledRequestButton}
                    style={{ fontWeight: 100, padding: "0.6em" }}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={startSearchForNewWorkspaceMembers}
                  >
                    {!loading ? "Search" : "Searching"}
                  </LoadingButton>
                </div>
              </div>
              <div className="error-message-container">
                {errorMessage !== null && (
                  <div className="error-message">{errorMessage}</div>
                )}
                {errorMessage === null && (
                  <div className="error-message-placeholder invisible">
                    placeholder error
                  </div>
                )}
              </div>
            </div>
            <div className="members-list ">
              <div className="search-database-members-list">
                {foundMembers.length >= 1 && (
                  <div className="found-members mt-10">
                    <div className="header-title font-semibold pb-2">
                      Found members
                    </div>
                    <div className="list">
                      {foundMembers.map((foundMember: any, memberIndex) => {
                        const isWorkspaceMember =
                          selectedWorkspace.membersId[foundMember.id];
                        return (
                          <div
                            className="found-member-item flex justify-between items-center"
                            key={memberIndex}
                          >
                            <div className="left-side">
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
                            </div>

                            <div className="right-side">
                              {isWorkspaceMember != null && (
                                <div className="already-member-container text-blue-700">
                                  Workspace member
                                </div>
                              )}
                              {isWorkspaceMember == null && (
                                <div className="invite-container-btn">
                                  <LoadingButton
                                    disabled={disabledRequestButton}
                                    style={{
                                      fontWeight: 600,
                                      padding: "0.7em auto",
                                    }}
                                    loading={loadingInvite}
                                    loadingPosition="start"
                                    startIcon={<AddWorkspaceUserIcon />}
                                    variant="contained"
                                    onClick={() => {
                                      addFoundMemberToUserWorkspace(
                                        foundMember
                                      );
                                    }}
                                  >
                                    {!loadingInvite ? "Invite" : "Inviting"}
                                  </LoadingButton>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {selectedWorkspace.membersId != null && (
                <div className="workspace-list mt-5 border-t pt-4">
                  <div className="title font-medium pb-2">
                    Workspace members
                  </div>
                  <div className="list">
                    {Object.entries(selectedWorkspace.membersId).map(
                      (
                        [memberId, memberValue]: any,
                        indexWorkspaceMember: number
                      ) => {
                        const foundMember = usersList.find(
                          (user) => user.id === memberId
                        );
                        if (foundMember == null) return "";
                        const userIsSelf = foundMember.id === authUser.uid;
                        return (
                          <div
                            className="found-member-item flex justify-between items-center"
                            key={indexWorkspaceMember}
                          >
                            <div className="left-side">
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
                                    {areYouWorkspaceOwner ? (
                                      <div className="text-gray-700 font-sm">
                                        {"(Owner)"}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>

                                  <div className="email text-gray-600">
                                    {foundMember.email}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="right-side">
                              {areYouWorkspaceOwner == null && (
                                <div className="can-not-member-container text-red-700 invisible">
                                  -----
                                </div>
                              )}
                              {areYouWorkspaceOwner != null && (
                                <div className="remove-container-btn">
                                  <LoadingButton
                                    disabled={disabledRequestButton}
                                    style={{
                                      fontWeight: 600,
                                      padding: "0.7em auto",
                                    }}
                                    loading={loadingInvite}
                                    loadingPosition="start"
                                    startIcon={<RemoveWorkspaceUserIcon />}
                                    variant="contained"
                                    onClick={() => {
                                      selectedUserToRemove(foundMember);
                                      setDeleteModalStatus(true);
                                    }}
                                  >
                                    {!loadingRemove
                                      ? `Remove ${userIsSelf ? "self" : ""}`
                                      : "Removeing"}
                                  </LoadingButton>
                                </div>
                              )}
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
                  Are you sure you want to delete the user ?
                </Typography>
                {deleteErrorMessage != null && (
                  <div className="text-center text-red-500 visible">
                    Could not delete the user
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
                      removeMemberFromWorkspaceFunction();
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
                      setUserToRemove(null);
                    }}
                  >
                    Keep
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}

      {selectedWorkspace != null && <div className="loading-container"></div>}
    </div>
  );
};

export default AddWorkspaceMembers;
