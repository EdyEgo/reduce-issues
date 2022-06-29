import * as React from "react";
import { useNavigate } from "react-router-dom";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { signOut } from "../../../../api/dataBaseAuthMethods";
import { changeErrorStatus } from "../../../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { changeUserStatus } from "../../../../store/auth";
import { changeProfileBarStatus } from "../../../../store/profile";
import {
  removeSubscriptions,
  clearIssuesMemory,
} from "../../../../store/issues";
import { clearTeamListMemoryOnLogOut } from "../../../../store/team";
import { clearWorkspaceMemory } from "../../../../store/workspace";
import { clearCurrentUser } from "../../../../store/users";

import { clearFilterIssueMemory } from "../../../../store/filtersIssues";
export default function MenuListComposition({
  open,
  setOpen,
  anchorRef,
}: {
  open: boolean;
  setOpen: (argument: any) => void;
  anchorRef: any;
}) {
  const workSpaceStore = useSelector((state: any) => state.workspace);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function directUserToProfilePage() {
    dispatch(changeProfileBarStatus());

    navigate(
      `/reduce-issues/${workSpaceStore.selectedWorkSpace.workspaceURL}/profile`
    );
  }

  async function logUserOut() {
    // left here , unsub from issues updates
    const result = await signOut();

    // reset store data

    if (result.error) {
      dispatch(changeErrorStatus(result.error));
      return false;
    }

    dispatch(changeUserStatus(null));
    dispatch(removeSubscriptions());

    // clear memory
    dispatch(clearTeamListMemoryOnLogOut());
    dispatch(clearWorkspaceMemory());
    dispatch(clearCurrentUser());
    dispatch(clearIssuesMemory());
    dispatch(clearFilterIssueMemory());

    navigate("/reduce-issues");

    return true;
  }

  return (
    <Stack direction="row" spacing={4} className="absolute top-7 left-8 z-10">
      <div>
        {/* <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Dashboard
        </Button> */}
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
                    <MenuItem
                      onClick={async (event) => {
                        directUserToProfilePage();
                        handleClose(event);
                      }}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem
                      onClick={async (event) => {
                        const userWasLoggedOut = await logUserOut();
                        if (userWasLoggedOut) handleClose(event);
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
