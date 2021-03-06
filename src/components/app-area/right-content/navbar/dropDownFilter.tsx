import * as React from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import CheckboxListAtl from '../../../selectors/checkboxListAlt'
import HeroItemsList from './menuHeroList'




export default function MenuListComposition({
  open,
  setOpen,
  anchorRef,
}: {
  open: boolean;
  setOpen: (argument: any) => void;

  
  anchorRef: any;
}) {
  

  const [showHeroMenu,setShowHeroMenu] = React.useState(true)
  const [showCheckBoxMenu,setShowCheckBoxMenu] = React.useState(false)
  const [checkboxType,setCheckboxType] = React.useState<null | string>(null)


 
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);

    setTimeout(()=>{

      // this timeout is so that when you close the filter 
      // the change on menus to not be seeing by the user 

      setShowHeroMenu(true)
      setShowCheckBoxMenu(false)
    },300)

  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

 

  

  
function handleClickOnHeroItem(selectedItem:string){
  setCheckboxType(selectedItem)
  setShowHeroMenu(false)
  setShowCheckBoxMenu(true)
}


 // create a toggle menu , that hides the dropDownFilter menu and shows the checkboxList , and vice versa

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
                   {showHeroMenu && <HeroItemsList handleClickItem={handleClickOnHeroItem}/>}
                    {showCheckBoxMenu && <CheckboxListAtl checkboxType={checkboxType}/>}
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
