import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Check from "@mui/icons-material/Check";
import { signOut } from "../../../../api/dataBaseAuthMethods";
import { changeSelectedWorkspace as changeSelectedWorkspaceApi } from "../../../../api/dataBaseWorkSpaceMethods";
import { changeErrorStatus } from "../../../../store/auth";

import { getUser, getUsers } from "../../../../api/dataBaseUsersMethods";
import { getTeams } from "../../../../api/dataBaseTeamsMethods";
import { setTeamList } from "../../../../store/team";
import { changeCurrentUser } from "../../../../store/users";
import { removeSubscriptions } from "../../../../store/issues";
import {
  changeSelectedWorkSpace,
  changeUserWorkspaces,
  loadMembersToStore,
} from "../../../../store/workspace";
import { changeSelectedWorkSpace as changeSelectedWorkSpaceStore } from "../../../../store/workspace";
import { useSelector, useDispatch } from "react-redux";

export default function MenuListComposition({
  open,
  setOpen,
  anchorRef,
}: {
  open: boolean;
  setOpen: (argument: any) => void;
  anchorRef: any;
}) {
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  const workspaces = useSelector(
    (state: any) => state.workspace.userWorkspaces
  );
  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );
  const authStoreEmail = useSelector((state: any) => state.auth.user.email);
  const authStoreUid = useSelector((state: any) => state.auth.user.uid);
  const currentUser = useSelector((state: any) => state.users.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      authStoreUid
    );

    if (result?.error) {
      setErrorMessage("Could not change your selected workspace ");
      return;
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
    console.log("delete this when you have your routes right!!!!!");
    //this part is not gonna be needed once you make the routes right <-----
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  async function logUserOut() {
    // left here , unsub from issues updates
    const result = await signOut();
    dispatch(removeSubscriptions());
    if (result.error) {
      dispatch(changeErrorStatus(result.error));
      return false;
    }
    navigate("/");
    return true;
  }

  function createWorkspaceList() {
    const objectList = Object.entries(workspaces);
    if (objectList.length <= 0) return [];
    return objectList.map((workspace: any, index) => {
      return (
        <div
          className="p-1 hover:bg-gray-200"
          onClick={async (event) => {
            if (workspace[1].id === selectedWorkspace.id) {
              handleClose(event);
              return;
            }
            await changeSelectedWorkspaceById(workspace[1].id);
            navigate(workspace[1].workspaceURL);
            handleClose(event);
          }}
          key={index}
        >
          {workspace[1].name}
          {workspace[1].id === selectedWorkspace.id && (
            <Check className="pl-2" />
          )}
        </div>
      );
    });
  }

  return (
    <Stack direction="row" spacing={5} className="absolute top-7 left-9 z-10">
      <div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem>{authStoreEmail}</MenuItem> */}
                    <div className="email-container p-2 font-semibold">
                      {authStoreEmail}
                    </div>

                    <div className="workspaces-list-container p-2">
                      {createWorkspaceList()}
                    </div>

                    <div className="line-separator border-b "></div>
                    <MenuItem
                      onClick={(event) => {
                        navigate("/addworkspace");
                        handleClose(event);
                      }}
                    >
                      Create a new workspace
                    </MenuItem>
                    <MenuItem
                      onClick={(event) => {
                        navigate("/workspace-stats-and-settings");
                        handleClose(event);
                      }}
                    >
                      Workspace settigns and stats
                    </MenuItem>

                    <MenuItem
                      onClick={(event) => {
                        navigate("/add-workspace-members");
                        handleClose(event);
                      }}
                    >
                      Workspace members
                    </MenuItem>

                    <MenuItem
                      onClick={(event) => {
                        navigate("/add-new-team");
                        handleClose(event);
                      }}
                    >
                      Add team
                    </MenuItem>

                    <div className="line-separator border-b "></div>

                    <MenuItem
                      style={{ color: "rgb(248,113,113)", marginTop: "5px" }}
                      onClick={async (event) => {
                        const userWasLoggedOut = await logUserOut();
                        if (userWasLoggedOut) {
                          handleClose(event);
                          navigate("/");
                        }
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
