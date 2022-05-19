import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { signOut } from "../../../../api/dataBaseAuthMethods";
import { authSlice, changeErrorStatus } from "../../../../store/auth";
import { useSelector, useDispatch } from "react-redux";


interface MenuItemInterface {
  type: string;
  name: string;
  action?: () => any;
  to?: string;
}

export default function MenuListComposition({
  open,
  setOpen,
  anchorRef,
}: {
  open: boolean;
  setOpen: (argument: any) => void;
  anchorRef: any;
}) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleToggle = () => {
  //     setOpen((prevOpen) => !prevOpen);
  //   };

  const authStore = useSelector((state: any) => state.auth);
  const teamStore = useSelector((state: any) => state.team);
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
    const extractEmailName = authStore.user.email.slice(
      0,
      authStore.user.email.indexOf("@")
    );

    navigate(`/${teamStore.selectedTeam.name}/profiles/${extractEmailName}`);
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

  return (
    <Stack direction="row" spacing={4} className="absolute top-7 left-8">
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
