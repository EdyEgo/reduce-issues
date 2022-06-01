import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { signOut } from "../../../../api/dataBaseAuthMethods";
import { authSlice, changeErrorStatus } from "../../../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import CheckboxList from '../../../selectors/checkboxList'
import HeroItemsList from './menuHeroList'
import MenuItem from "@mui/material/MenuItem";
import ViewGrupingFilters from './ViewGrupingFilters'




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

 

  

  



//  we gonna have a view:{default:{..someSettingsHere},custom:{...aCopyOfDefaultButWithChangesOfTheUserChanged,empty:boolean}} 
// if view.custom.empty is false then the user has changes and those are having priority before .default


  return (
    <Stack direction="row" spacing={4} className="absolute top-7 left-8 z-10">
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
  

                    <MenuItem
                     
                    >
                    
                    
                     <div className="gruping-row">
                        <ViewGrupingFilters/>
                     </div>
                    </MenuItem>

                    <MenuItem
                     
                     >
                     
                     
                      <div className="issues-properies-row">

                      </div>
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