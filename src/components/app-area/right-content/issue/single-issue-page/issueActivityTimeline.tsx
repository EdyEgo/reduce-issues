import { useState } from "react";
import moment from "moment";
import TimelineConnector from "@mui/lab/TimelineConnector";
import PlaceholderNoAssigneeIcon from "@mui/icons-material/AccountCircleTwoTone";
import RobotIcon from "@mui/icons-material/SmartToyOutlined";
import LeaveAComment from "./leaveAComment";
import DeleteCommentIcon from "@mui/icons-material/DeleteSweepSharp";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LinearProgress from "@mui/material/LinearProgress";
import DangerDeleteIssue from "@mui/icons-material/ReportProblemSharp";
import { updateIssue } from "../../../../../api/dataBaseIssuesMethods";
import Stack from "@mui/material/Stack";

import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

export default function BasicTimeline({
  issueActivity,
  issueId,
  teamId,
  workspaceId,
}: {
  issueActivity: any[];
  issueId: string;
  teamId: string;
  workspaceId: string;
}) {
  const workspaceMembersList: any[] = useSelector(
    (state: any) => state.workspace.members
  );

  const authUser = useSelector((state: any) => state.auth.user);
  const workspaceSelected = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );
  // make a title with self delete or by case , delete as workspace owner
  const areYouTheWorkspaceOwner = detectIfYouAreTheWorkspaceOwner();

  function detectIfYouAreTheWorkspaceOwner() {
    const listMembers: {
      [key: string]: { role: "Owner" | string; invitedAt: any };
    } = workspaceSelected.membersId;
    if (
      Object.hasOwn(listMembers, authUser.uid) &&
      listMembers[authUser.uid].role === "Owner"
    ) {
      return true;
    }
    return false;
  }

  // delete comment modal
  const [
    currentActivityIndexOpenedModalFor,
    setCurrentActivityIndexOpenedModalFor,
  ] = useState<null | number>(null); // set to null at closing the modal
  const [deleteLoginModalStatus, setDeleteLoginModalStatus] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<null | string>(
    null
  );
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  function findCommentAndDeleteIt(commentObjectIndexToDelete: number) {
    const copyIssueActivity = [...issueActivity];
    copyIssueActivity.splice(commentObjectIndexToDelete, 1);

    return copyIssueActivity;
  }

  async function deleteIsssueCommentActivity() {
    if (currentActivityIndexOpenedModalFor === null) return;
    setDeleteLoginModalStatus(true);

    const updatedArray = findCommentAndDeleteIt(
      currentActivityIndexOpenedModalFor
    );

    const { error, message } = await updateIssue({
      inputObject: { activity: updatedArray },
      issueId,
      teamId,
      workspaceId,
    });

    if (error && message) {
      // could not be deleted, show message
      setDeleteErrorMessage(message);

      setTimeout(() => {
        setDeleteErrorMessage(null);
      }, 3000);
    }

    setDeleteLoginModalStatus(false);
    setDeleteModalStatus(false);
  }

  const textActivity: { [key: string]: string } = {
    created: "created the issue",
    dueDate: "changed due date",
    addedLabel: "added label",
    addedStatus: "added status",
    addedPriority: "added priority",
    changedStatus: "changed status",
    changedLabel: "changed label",
    changedPriority: "changed priority",
    titleUpdate: "updated the title",
    textUpdate: "updated the description",
    textAndTitleUpdate: "updated title and description",
    selfAssigned: "self-assigned the issue",
    removedAssignee: "removed assignee",
    assignedTo: "assgine the issue to",
    comment: "",
  };

  function findAssigneedUserByIssueAssignedId(userId: string) {
    for (const memberIndex in workspaceMembersList) {
      const memberValue = workspaceMembersList[memberIndex];
      if (memberValue.id === userId) return memberValue;
    }

    return null;
  }

  const currentUserHasTwoNames = authUser.displayName.indexOf(" ");
  const splitdisplayName =
    currentUserHasTwoNames !== -1 ? authUser.displayName.split(" ") : null;
  const useUserName =
    splitdisplayName != null
      ? splitdisplayName[0] + " " + splitdisplayName[1][0] + "."
      : authUser.displayName;
  const shortUserName =
    useUserName.length > 20 ? useUserName.slice(0, 20) + ".." : useUserName;
  return (
    <div className="container-timeline p-4">
      <div className="time-line-list-container">
        {issueActivity.map(
          (
            activity: {
              creatorId: null | string;
              type: string;
              registeredAt: any;
              commentMessage?: string;
              assignedIssueToId?: string;
              fromMessage?: null | string;
              toMessage?: null | string;
            },
            currentActivityIndex
          ) => {
            const assignedMemberToIssue =
              activity.creatorId !== null
                ? findAssigneedUserByIssueAssignedId(activity.creatorId)
                : false;
            const memberAssignedIssueObjectct = activity?.assignedIssueToId
              ? findAssigneedUserByIssueAssignedId(activity.assignedIssueToId)
              : null;

            function returnFateMessageOrStringMessage(message: any) {
              //string | Date
              if (typeof message === "object" && message?.toDate != null) {
                return moment(message.toDate()).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                );
              }
              return message;
            }

            let titleCommentTypeButton = "";
            if (
              activity.type === "comment" &&
              authUser.uid === activity.creatorId
            )
              titleCommentTypeButton = "delete your comment";
            if (activity.type === "comment" && areYouTheWorkspaceOwner)
              titleCommentTypeButton = "delete comment as workspace owner";
            return (
              <div className="timeline-item p-2 " key={currentActivityIndex}>
                <div className="timeline-separator">
                  {assignedMemberToIssue !== false && (
                    <div className="creator-container">
                      {assignedMemberToIssue !== null &&
                        assignedMemberToIssue.photoURL != null && (
                          <div className="assignee-exists flex items-center gap-2">
                            <div className="assignee-icon">
                              <Avatar
                                src={assignedMemberToIssue.photoURL}
                                sx={{ width: 19, height: 19 }}
                                alt=""
                              />
                            </div>
                            <div className="assignee-name text-xs flex gap-1">
                              <div className="firstName">
                                {assignedMemberToIssue.firstName}
                              </div>
                              <div className="lastName">
                                {assignedMemberToIssue.lastName}
                              </div>
                            </div>

                            {activity.registeredAt != null &&
                              activity.type === "comment" && (
                                <div className="about-comment-container flex gap-4">
                                  <div className="humanize-date text-gray-600">
                                    {moment(
                                      activity.registeredAt.toDate()
                                    ).fromNow()}
                                  </div>

                                  {titleCommentTypeButton !== "" && (
                                    <div className="delete-comment flex gap-4 items-center text-gray-600  cursor-pointer hover:text-red-400 rounded-md">
                                      <div title={titleCommentTypeButton}>
                                        <DeleteCommentIcon
                                          onClick={() => {
                                            setDeleteModalStatus(true);
                                            setCurrentActivityIndexOpenedModalFor(
                                              currentActivityIndex
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                          </div>
                        )}

                      {assignedMemberToIssue === null && (
                        <div className="assignee-placeholder flex items-center gap-2">
                          <div className="assignee-icon">
                            <PlaceholderNoAssigneeIcon />
                          </div>
                          <div className="assignee-name">Assignee</div>
                        </div>
                      )}
                    </div>
                  )}
                  {activity.type === "created" && activity.creatorId == null && (
                    <div className="flex gap-2">
                      <RobotIcon />
                      <div className="app-name flex gap-2">
                        <div>Reduce</div>
                        <div>Issues</div>
                      </div>
                    </div>
                  )}

                  <TimelineConnector />
                </div>
                <div className="timeline-content pl-6 py-1">
                  {textActivity[activity.type] != null &&
                    activity.type !== "comment" && (
                      <div className="message-container flex gap-4">
                        <div className="base-message">
                          {textActivity[activity.type]}
                        </div>
                        {memberAssignedIssueObjectct != null && (
                          <div className="assgined-issue-to">
                            {
                              <div className="assigned-to-container">
                                <div className="assignee-exists flex items-center gap-2">
                                  <div className="assignee-icon">
                                    {memberAssignedIssueObjectct.photoURL !=
                                      null && (
                                      <Avatar
                                        src={
                                          memberAssignedIssueObjectct.photoURL
                                        }
                                        sx={{ width: 19, height: 19 }}
                                        alt=""
                                      />
                                    )}
                                    {memberAssignedIssueObjectct.photoURL ==
                                      null && (
                                      <div className="assignee-icon">
                                        <PlaceholderNoAssigneeIcon />
                                      </div>
                                    )}
                                  </div>
                                  <div className="assignee-name text-xs flex gap-1">
                                    <div className="firstName">
                                      {memberAssignedIssueObjectct.firstName}
                                    </div>
                                    <div className="lastName">
                                      {memberAssignedIssueObjectct.lastName}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        )}
                        {activity.fromMessage != null && (
                          <div className="from-message flex gap-2">
                            <div>from</div>
                            <div className="font-semibold">
                              {returnFateMessageOrStringMessage(
                                activity.fromMessage
                              )}
                            </div>
                          </div>
                        )}
                        {activity.fromMessage != null &&
                          activity.toMessage != null && (
                            <div className="to-message">to</div>
                          )}
                        {activity.toMessage != null && (
                          <div className="to-conclusion-message font-semibold">
                            {returnFateMessageOrStringMessage(
                              activity.toMessage
                            )}
                          </div>
                        )}
                      </div>
                    )}

                  {activity.type === "comment" &&
                    typeof activity.commentMessage === "string" && (
                      <div className="comment-container shadow-md p-4 break-words">
                        <div className="text-comment-container">
                          {activity.commentMessage}
                        </div>
                      </div>
                    )}

                  {activity.registeredAt != null &&
                    activity.type !== "comment" && (
                      <div className="humanize-date text-gray-600">
                        {moment(activity.registeredAt.toDate()).fromNow()}
                      </div>
                    )}
                </div>
                <div className="time-line__line-history h-8 bg-gray-400  border w-1 ml-2 my-2"></div>
              </div>
            );
          }
        )}

        <div className="timeline-item p-2">
          <div className="timeline-separator">
            <div className="current-logged-user-avatar flex gap-2">
              {/* authUser.uid */}
              {authUser.photoURL != null && (
                <Avatar
                  src={authUser.photoURL}
                  sx={{ width: 19, height: 19 }}
                  alt=""
                />
              )}
              {authUser.photoURL == null && (
                <div className="assignee-icon">
                  <PlaceholderNoAssigneeIcon />
                </div>
              )}
              <div className="current-user-details text-center">
                <div className="first-name">
                  {shortUserName} {"(Me)"}
                </div>
              </div>
            </div>
          </div>
          <div className="timeline-content py-1">
            <div className="input-comment">
              <div className="call-to-action-label text-gray-500 p-2 pl-0">
                Leave a comment...
              </div>
              <LeaveAComment
                issueId={issueId}
                teamId={teamId}
                workspaceId={workspaceId}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={deleteModalStatus}
        onClose={() => {
          setDeleteModalStatus(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid white",
            boxShadow: 24,
            p: 3,
          }}
        >
          {deleteLoginModalStatus && (
            <Stack
              sx={{
                width: "100%",
                color: "grey.500",
                visibility: "visible",
              }}
              spacing={2}
            >
              <LinearProgress color="success" />
            </Stack>
          )}
          {deleteLoginModalStatus === false && (
            <Stack
              sx={{
                width: "100%",
                color: "grey.500",
                visibility: "hidden",
              }}
              spacing={2}
            >
              <LinearProgress color="success" />
            </Stack>
          )}
          <div className="container">
            <div className="flex justify-center my-2">
              <DangerDeleteIssue className="text-red-500" />
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this comment?
            </Typography>
            {deleteErrorMessage != null && (
              <div className="text-center text-red-500 visible">
                Could not delete the issue
              </div>
            )}
            {deleteErrorMessage == null && (
              <div className="text-center text-red-500 invisible">
                placeholder
              </div>
            )}
            <div className="flex justify-between m-2 mt-4">
              <Button
                onClick={() => {
                  deleteIsssueCommentActivity();
                }}
                disabled={deleteLoginModalStatus}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                disabled={deleteLoginModalStatus}
                variant="contained"
                color="success"
                onClick={() => {
                  setDeleteModalStatus(false);
                  setCurrentActivityIndexOpenedModalFor(null);
                }}
              >
                Keep
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
