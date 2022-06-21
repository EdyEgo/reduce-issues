import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import AvatarPlaceholder from "@mui/icons-material/AccountCircle";
import SnackBarCRUDInfo from "../../../../composables/info-popovers/snackbar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { updateATeamName } from "../../../../store/team";

import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
// import extractFitIconNoDinamic from "../../../../selectors/helpers/extractFitIconNoDinamic";
import extractFitIconNoDinamic from "../../../selectors/helpers/extractFitIconNoDinamic";
import { updateOneteam } from "../../../../api/dataBaseTeamsMethods";

import {
  labelsList,
  priorityList,
  statusList,
} from "../../../../composables/modalOptions/issues";

interface TeamSettingsProps {}

const TeamSettings: React.FC<TeamSettingsProps> = () => {
  const params = useParams();
  const teamURL = params.teamURL;

  const dispatch = useDispatch();
  const teamList = useSelector((state: any) => state.team.teamList);
  const usersList: any[] = useSelector((state: any) => state.workspace.members);
  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );
  const teamIssuesList = useSelector((state: any) => state.issues.teamsIssues);
  const selectedTeam = findTeamByIdentifier();
  const [teamInputName, setTeamInputName] = useState(selectedTeam?.name);
  //   message={} openStatus={} setOpenStatus={} severityType={
  const [updateNameLogin, setUpdateNameLogin] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpenStatus, setSnackBarOpenStatus] = useState(false);
  const [snackBarSeverityType, setSnackBarSeverityType] = useState<
    "success" | "error" | null
  >(null);

  const buttonSx = {
    ...(snackBarSeverityType === "success" && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  function findTeamByIdentifier() {
    if (teamURL == null) return null;
    for (const teamValue of teamList) {
      if (teamValue.identified.toLowerCase() === teamURL.toLowerCase()) {
        return teamValue;
      }
    }
  }

  function findTeamMemberById(serchedMemberId: string) {
    return usersList.find((userItem: any) => userItem.id === serchedMemberId);
  }

  async function updateTeamName() {
    if (teamInputName === "" || teamInputName === null) return;

    setUpdateNameLogin(true);
    const { error } = await updateOneteam({
      teamId: selectedTeam.id,
      inputObject: { name: teamInputName },
      workspaceId: selectedWorkspace.id,
    });
    setUpdateNameLogin(false);

    if (error) {
      setSnackBarOpenStatus(true);
      setSnackBarSeverityType("error");
      setSnackBarMessage("Could not update the team name");
    }
    if (!error) {
      dispatch(
        updateATeamName({
          teamId: selectedTeam.id,
          newName: teamInputName,
        })
      );
      setSnackBarOpenStatus(true);
      setSnackBarSeverityType("success");
      setSnackBarMessage("Team name updated");
    }
  }

  //   function findIssueInTeamsIssues() {
  //     //identified
  //     let issueObject = null;

  //     loopTeam: for (const teamId in teamIssuesList) {
  //       const teamIssuesValue = teamIssuesList[teamId];
  //       if (teamIssuesValue.length <= 0) continue;
  //       for (
  //         let issueIndex = 0;
  //         issueIndex < teamIssuesValue.length;
  //         issueIndex++
  //       ) {
  //         const issueValueObject = teamIssuesValue[issueIndex].identified;
  //         console.log("bruh", issueValueObject);
  //         // if (
  //         //   issueValueObject?.identified &&
  //         //   issueIdentified &&
  //         //   issueValueObject.identified.toLowerCase() ===
  //         //     issueIdentified.toLowerCase()
  //         // ) {
  //         //   issueObject = issueValueObject;
  //         //   break loopTeam;
  //         // }
  //       }
  //     }

  //     return issueObject;
  //   }
  function returnLabelsTypeList(icon: string, name: string, index: number) {
    return (
      <div className="item flex gap-2" key={index}>
        <div className="item-type-info flex gap-2">
          <div className="icon">
            {extractFitIconNoDinamic({
              iconName: icon,
              index: index + 1,
            })}
          </div>
          <div className="name">{name}: </div>
        </div>

        <div className="number-associated">
          {selectedTeam?.createdStatus != null
            ? selectedTeam?.createdStatus[icon] != null
              ? selectedTeam?.createdStatus[icon]
              : 0
            : 0}
        </div>
      </div>
    );
  } // usefull for future progress
  // change team name and delete users

  return (
    <div className="team-settings-container">
      {selectedTeam != null && (
        <div className="content-container">
          <div className="nav-team-settings  p-8">
            <div className="about-container border-b pb-2 ">
              <div className="about-team ">
                <div className="team-name-title flex">
                  <textarea
                    onChange={(event) => {
                      setTeamInputName(event.target.value);
                    }}
                    className="text-2xl w-full shadow-md  p-2  border overflow-hidden break-words rounded-md resize-none border-white transition-all ease-in-out"
                    value={teamInputName}
                  ></textarea>

                  <div
                    className={
                      selectedTeam.name != null &&
                      teamInputName !== "" &&
                      teamInputName !== selectedTeam.name
                        ? "save-changed-name visible p-2 flex"
                        : "save-changed-name invisible p-2"
                    }
                  >
                    {/* <div
                      onClick={updateTeamName}
                      className="change-name-container bg-green-400 rounded-md p-2 text-gray-800 cursor-pointer"
                    >
                      Change team name
                    </div> */}

                    <Box sx={{ m: 1, position: "relative" }}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        onClick={updateTeamName}
                      >
                        {snackBarSeverityType === "success" ? (
                          <CheckIcon />
                        ) : (
                          <SaveIcon />
                        )}
                      </Fab>
                      {updateNameLogin && (
                        <CircularProgress
                          size={68}
                          sx={{
                            color: green[500],
                            position: "absolute",
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                  </div>
                </div>
                <div className="about-this-page text-gray-700">
                  Manage this team
                </div>
              </div>
            </div>
          </div>
          <div className="stats-container">
            <div className="stats-list">
              <div className="id-container flex gap-2">
                <div> ID Name : </div>
                <div>{selectedTeam.identified}</div>
              </div>
              {selectedTeam.registeredAt != null &&
                selectedTeam.registeredAt.nanoseconds > 0 &&
                selectedTeam.registeredAt.seconds > 0 && (
                  <div className="created-at-container flex gap-2">
                    <div> Team created : </div>
                    <div
                      className="cursor-default hover:text-gray-600"
                      title={`Team created at ${selectedTeam.registeredAt.toDate()}`}
                    >
                      {moment(selectedTeam.registeredAt.toDate()).fromNow()}
                    </div>
                  </div>
                )}
              <div className="time-zone gap-2 flex">
                <div> Register with </div>
                <div> "{selectedTeam.timezone}" timezone </div>
              </div>

              <div className="general-issue-stats">
                {selectedTeam.assignedIssues && (
                  <div className="assigneed-issue-number flex gap-2">
                    <div>Issue number with an assignee</div>
                    <div>{selectedTeam.assignedIssues}</div>
                  </div>
                )}

                {selectedTeam.unassignedIssues && (
                  <div className="assigneed-issue-number flex gap-2">
                    <div>Issue number without an assignee</div>
                    <div>{selectedTeam.unassignedIssues}</div>
                  </div>
                )}
              </div>

              {/* <div className="created-labels-numbers">
                <div className="status-list">
                  <div className="title text-lg">
                    Created issues with status types
                  </div>
                  <div className="list">
                    {statusList.map(({ icon, name }, index) => {
                      return returnLabelsTypeList(icon, name, index);
                    })}
                  </div>
                </div>
                <div className="priority-list">
                  <div className="title text-lg">
                    Created issues with priority types
                  </div>

                  <div className="list">
                    {priorityList.map(({ icon, name }, index) => {
                      return returnLabelsTypeList(icon, name, index);
                    })}
                  </div>
                </div>
                <div className="labels-list">
                  <div className="title text-lg">
                    Created issues with label types
                  </div>
                  <div className="list">
                    {labelsList.map(({ icon, name }, index) => {
                      return returnLabelsTypeList(icon, name, index);
                    })}
                  </div>
                </div>
              </div> */}

              {selectedTeam.membersId != null && (
                <div className="team-members-list">
                  <div className="members-list-title text-lg p-1">
                    Team members list
                  </div>
                  <div className="list">
                    {Object.entries(selectedTeam.membersId).map(
                      (
                        [memberId, memberValue]: [
                          memberId: string,
                          memberValue: any
                        ],
                        index: number
                      ) => {
                        const foundMember = findTeamMemberById(memberId);
                        return (
                          <div key={index} className="flex  gap-4">
                            <div className="member-details flex gap-2">
                              <div className="avatar-container ">
                                {foundMember?.photoURL != null && (
                                  <Avatar
                                    src={foundMember.photoURL}
                                    sx={{ width: 20, height: 20 }}
                                  />
                                )}
                                {foundMember?.photoURL == null && (
                                  <AvatarPlaceholder />
                                )}
                              </div>
                              <div className="name-container flex gap-2">
                                <div className="firstName">
                                  {foundMember.firstName}
                                </div>
                                <div className="lastName">
                                  {foundMember.lastName}
                                </div>
                              </div>
                            </div>
                            <div className="invited-at flex gap-2 text-gray-600">
                              <div>Added :</div>
                              <div>
                                {memberValue?.invitedAt != null &&
                                  memberValue.invitedAt.nanoseconds > 0 &&
                                  memberValue.invitedAt.seconds > 0 &&
                                  moment(
                                    memberValue.invitedAt.toDate()
                                  ).fromNow()}
                              </div>
                            </div>
                            <div className="role flex gap-2">
                              <div>Role:</div>
                              <div>{memberValue.role}</div>
                            </div>
                            <div className="created-issues flex gap-2">
                              <div>Created issues:</div>
                              <div>{memberValue.createdIssues}</div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="add-members-to-the-team">{/* from workspace */}</div>
        </div>
      )}

      {selectedTeam != null && <div className="loading-container"></div>}
      <SnackBarCRUDInfo
        message={snackBarMessage}
        openStatus={snackBarOpenStatus}
        setOpenStatus={setSnackBarOpenStatus}
        setSeverityType={setSnackBarSeverityType}
        severityType={snackBarSeverityType}
      />
    </div>
  );
};

export default TeamSettings;
