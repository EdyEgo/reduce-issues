import * as React from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack";
import ExtractFitIconNoDinamic from "../../../selectors/helpers/extractFitIconNoDinamic"//'./helpers/extractFitIconNoDinamic'

import {labelsList,priorityList,statusList} from "../../../../composables/modalOptions/issues"

import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import {updateIssue} from '../../../../api/dataBaseIssuesMethods'





export default function DropDownChangeLabelOnTheGo({
  open,
  setOpen,
  issueObject,
  selectBoxType,
  anchorRef,
}: {
  open: boolean;
  setOpen: (argument: any) => void;
  selectBoxType:"status" | "priority" | "labels";
  issueObject:any;
  anchorRef: any;
}) {
  

    const params = useParams() 


    function findTeamId(teamList:any[]){
        if(params?.teamURL == null) return null
       return teamList.find((team)=>team.identified.toLowerCase() === params.teamURL).id
      }
  
  const selectedWorkspace = useSelector((state:any)=>state.workspace.selectedWorkSpace)    

  const teamsList = useSelector( 
    (state: any) => state.team.teamList
  );
  const selectedTeamId = findTeamId(teamsList)



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

 
  async function changeIssuePropertiesOnTheGo({icon,name}:{icon:string,name:string}){
      
   
      const issueId = issueObject.id
      const workspaceId = selectedWorkspace.id
     
     
   const {error} =  await updateIssue({inputObject:{[selectBoxType]:{icon,name}},issueId,teamId:selectedTeamId,workspaceId})
  
   if(error) console.log('error on updateing the issue',error)
  }

  

  function returnTypeList(){

    const listOfTypes:{[key:string]:()=>any[]} = {
        status:()=>statusList,
        priority:()=>priorityList,
        labels:()=>labelsList
    }

 
    return(<>
     {
     listOfTypes[selectBoxType]().map(({icon,name},index)=>{
           return (
           <MenuItem key={index} onClick={async(event)=>{await changeIssuePropertiesOnTheGo({icon,name});handleClose(event)}}
                >
                    <div className="icon-container">{ExtractFitIconNoDinamic({iconName:icon,index})}</div>
                    <div className="name-container">{name}</div>
                
            </MenuItem>
           
           )
     })
     
     }
    
    </>)
  }
  




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
                 {returnTypeList()}
                  
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