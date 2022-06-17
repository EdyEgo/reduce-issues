import * as React from "react";


import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Avatar from '@mui/material/Avatar';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack";
import { useParams } from 'react-router-dom'

import {updateIssue} from '../../../../api/dataBaseIssuesMethods'

import { useSelector, useDispatch } from "react-redux";





export default function DropDownChangeLabelOnTheGo({
  open,
  setOpen,
  issueObject,
  anchorRef,
}: {
  open: boolean;
  setOpen: (argument: any) => void;
  issueObject:any
  
  anchorRef: any;
}) {
   
    const params = useParams() 
    
   


    // function findIssueTeam(){
    //   // this function is just a lot of nonsense just because i don t want to store at least in the objects the link , jesus , wth man
    // const selectedWorkspaceUrl = selectedWorkspace.workspaceURL
    // const searchedIssueId = issueObject.id
    // let foundedIssue =  null
    // let foundedTeamNeededId = null
    // let teamURLNeeded = null
    // let foundedTeamObject = null
    // // i need the issue identified and the team url and workspace
   
    
    // // search thorugh teams 
   
    // teamLoop: for(const teamId in workspacesTeams){
    //    const teamIssuesList = workspacesTeams[teamId]
    //    if(teamIssuesList.length <= 0) continue
       
    //    for(let issueIndex = 0;issueIndex < teamIssuesList.length;issueIndex++){
    //       const currentInLoopIssue = teamIssuesList[issueIndex]
    //       if(currentInLoopIssue.id === searchedIssueId){
    //        foundedTeamNeededId = teamId
    //        foundedIssue = currentInLoopIssue
    //        break teamLoop 
    //       }
    //    }
        
    // }
   
    
    // for(let teamIndex = 0;teamIndex < teamList.length;teamIndex++){
    //    const currentTeamValue = teamList[teamIndex]
       
    //    if(currentTeamValue.id === foundedTeamNeededId){
    //      foundedTeamObject = currentTeamValue
    //      teamURLNeeded = currentTeamValue.identified
    //      break
    //    }
   
    // }
   
   
    // return foundedTeamObject
   
    // }

    function findTeamId(teamList:any[]){
        if(params?.teamURL == null) {

          // return findIssueTeam().id
          return issueObject.teamId
        }
       return teamList.find((team)=>team.identified.toLowerCase() === params.teamURL).id
      }
 
  const selectedWorkspace = useSelector((state:any)=>state.workspace.selectedWorkSpace)    
  const workspaceMembers = useSelector((state:any)=>state.workspace.members)
  const teamsList = useSelector( 
  (state: any) => state.team.teamList
);
const selectedTeamId = issueObject.teamId//findTeamId(teamsList)
  const selectedTeamObject = teamsList.find((team:any)=>team.id === selectedTeamId)

 
  
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

 
  async function changeIssuePropertiesOnTheGo(userObject:any){
      const issueId = issueObject.id
      const workspaceId = selectedWorkspace.id
     
      if(userObject == null) {
    // assign to null
    const {error} = await updateIssue({inputObject:{assignedToUserId:null},issueId,teamId:selectedTeamId,workspaceId})
    if(error) console.log('error on updateing the issue',error)
    return 
      }
     const userId = userObject.id

     const {error} = await updateIssue({inputObject:{assignedToUserId:userId},issueId,teamId:selectedTeamId,workspaceId})
     if(error) console.log('error on updateing the issue',error)
  }

  

  function returnList(){

    const teamMembers =  Object.entries(selectedTeamObject.membersId)

 
  
 
    return(<div> 
     <MenuItem key={teamMembers.length + 1} className="gap-2" onClick={async(event)=>{await changeIssuePropertiesOnTheGo(null);handleClose(event)}}
                >
                    <div className="icon-container ">
                        
                      
                         <AccountCircleSharpIcon sx={{ width: 20, height: 20 }} />
                       
                    </div>
                    <div className="name-container flex gap-2">
                       <div className="first-name">No</div>
                       <div className="last-name">Assignee</div>
                    </div>
                
            </MenuItem>
     { 
teamMembers.length >= 1 &&
     
           
           teamMembers.map(([userId,userObjectValue],index)=>{
              
               const findMemberObjectInWorkspace = workspaceMembers.find((member:any)=>member.id === userId)
                  
        return (
           <MenuItem key={index} className="gap-2" onClick={async(event)=>{await changeIssuePropertiesOnTheGo(findMemberObjectInWorkspace);handleClose(event)}}
                >
                    <div className="icon-container ">
                        {findMemberObjectInWorkspace.photoURL != null && 
                        <Avatar sx={{ width: 20, height: 20 }}
                           alt={`icon`}
                            src={findMemberObjectInWorkspace.photoURL}
                        />}
                        {
                           findMemberObjectInWorkspace.photoURL == null &&
                         <AccountCircleSharpIcon sx={{ width: 20, height: 20 }} />
                        }
                    </div>
                    <div className="name-container flex gap-2">
                       <div className="first-name">{findMemberObjectInWorkspace.firstName != null && findMemberObjectInWorkspace.firstName}</div>
                       <div className="last-name">{findMemberObjectInWorkspace.lastName != null && findMemberObjectInWorkspace.lastName}</div>
                    </div>
                
            </MenuItem>
           
           )
     })
     
     }
    
    </div>)
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
                 {returnList()}
                  
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