



import * as React from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { changeAllAllFilterListIsValueByType} from '../../../../../store/filtersIssues'




export default function DropDownIsSelector({
  open,
  setOpen,
  labelType,
  anchorRef,
}: {
  open: boolean;
  labelType:string;
  setOpen: (argument: any) => void;

  
  anchorRef: any;
}) {



  const filtersListOrder = useSelector((state: any) => state.filtersIssues.filtersListOrder);
  
  const  labelList = filtersListOrder[labelType]
  const isPlural = labelList.length > 1 ? "is either of" : "is"
  const dispatch = useDispatch();


  function changeValueToAllFilters(filtersNewValue:boolean){
   
    dispatch(changeAllAllFilterListIsValueByType({type:labelType,newValue:filtersNewValue}))
}


  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);

    // do something

  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
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
                   <MenuItem
                     onClick={()=>{changeValueToAllFilters(false)}}
                     className="flex gap-2"
                    >
                    
                     <span className="icon">
                        <DoNotDisturbIcon/>
                     </span>
                     <span className="name">
                        is not
                     </span>
                    </MenuItem> 

                    <MenuItem
                     onClick={()=>{changeValueToAllFilters(true)}} className="flex gap-2"
                    >
                    
                     <span className="icon">
                        <AddSharpIcon/>
                     </span>
                     <span className="name">
                     {isPlural}
                     </span>
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