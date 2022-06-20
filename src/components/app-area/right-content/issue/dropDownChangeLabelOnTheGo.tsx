import * as React from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import ExtractFitIconNoDinamic from "../../../selectors/helpers/extractFitIconNoDinamic"; //'./helpers/extractFitIconNoDinamic'

import {
  labelsList,
  priorityList,
  statusList,
} from "../../../../composables/modalOptions/issues";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateIssue } from "../../../../api/dataBaseIssuesMethods";

export default function DropDownChangeLabelOnTheGo({
  open,
  setOpen,
  issueObject,
  selectBoxType,
  anchorRef,
}: {
  open: boolean;
  setOpen: (argument: any) => void;
  selectBoxType: "status" | "priority" | "labels";
  issueObject: any;
  anchorRef: any;
}) {
  // const params = useParams()

  const authUser = useSelector((state: any) => state.auth.user);

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

  // function findTeamId(teamList:any[]){

  //     if(params?.teamURL == null)  {
  //     //  return findIssueTeam().id
  //        return issueObject.teamId

  //     }
  //    return teamList.find((team)=>team.identified.toLowerCase() === params.teamURL?.toLowerCase()).id
  //   }

  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );

  const selectedTeamId = issueObject.teamId; //findTeamId(teamsList)

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

  async function changeIssuePropertiesOnTheGo({
    icon,
    name,
  }: {
    icon: string;
    name: string;
  }) {
    const issueId = issueObject.id;
    const workspaceId = selectedWorkspace.id;

    const boxTypeReplaceLabelWithLabels =
      selectBoxType === "labels" ? "label" : selectBoxType;

    const changedOrAddedLabel =
      issueObject[boxTypeReplaceLabelWithLabels] == null ? "added" : "changed";

    const fromMessage =
      changedOrAddedLabel === "changed"
        ? issueObject[boxTypeReplaceLabelWithLabels].name
        : null;

    const createActivityKey =
      changedOrAddedLabel +
      boxTypeReplaceLabelWithLabels[0].toUpperCase() +
      boxTypeReplaceLabelWithLabels.slice(1, selectBoxType.length); // ex:changedStatus/addedStatus

    const addToActivity = {
      creatorId: authUser.uid,
      type: createActivityKey,

      fromMessage,
      toMessage: name,
    };

    const { error } = await updateIssue({
      inputObject: { [boxTypeReplaceLabelWithLabels]: { icon, name } },
      issueId,
      teamId: selectedTeamId,
      workspaceId,
      addToActivity,
    });

    if (error) console.log("error on updateing the issue", error);
  }

  function returnTypeList() {
    const listOfTypes: { [key: string]: () => any[] } = {
      status: () => statusList,
      priority: () => priorityList,
      labels: () => labelsList,
    };

    return (
      <div>
        {listOfTypes[selectBoxType]().map(({ icon, name }, index) => {
          return (
            <MenuItem
              key={index}
              className="gap-2"
              onClick={async (event) => {
                await changeIssuePropertiesOnTheGo({ icon, name });
                handleClose(event);
              }}
            >
              <div className="icon-container">
                {ExtractFitIconNoDinamic({ iconName: icon, index })}
              </div>
              <div className="name-container">{name}</div>
            </MenuItem>
          );
        })}
      </div>
    );
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
