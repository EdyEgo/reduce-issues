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
import { signOut } from "../../../../api/dataBaseAuthMethods";
import { changeSelectedWorkspace as changeSelectedWorkspaceApi } from "../../../../api/dataBaseWorkSpaceMethods";
import { changeErrorStatus } from "../../../../store/auth";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function changeSelectedWorkspaceById(selectedWorkspaceId: string) {
    const result = await changeSelectedWorkspaceApi(
      selectedWorkspaceId,
      authStoreUid
    );
    if (result?.error) {
      setErrorMessage("Could not change your selected workspace ");
      return;
    }
    const newWorkspaceSelected = workspaces[selectedWorkspaceId];
    dispatch(changeSelectedWorkSpaceStore(newWorkspaceSelected));
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
    const result = await signOut();
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
        <MenuItem
          onClick={(event) => {
            changeSelectedWorkspaceById(workspace[1].id);
            navigate(workspace[1].workspaceURL);
            handleClose(event);
          }}
          key={index}
        >
          {workspace[1].name}
        </MenuItem>
      );
    });
  }

  return (
    <Stack direction="row" spacing={5} className="absolute top-7 left-9">
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

                    <MenuItem>
                      <div className="workspaces-list-container ">
                        {createWorkspaceList()}
                      </div>
                    </MenuItem>

                    <div className="line-separator border-b "></div>
                    <MenuItem
                      onClick={(event) => {
                        navigate("/addworkspace");
                        handleClose(event);
                      }}
                    >
                      Create a new workspace
                    </MenuItem>
                    <div className="line-separator border-b "></div>

                    <MenuItem
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
