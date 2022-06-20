import * as React from "react";
import moment from "moment";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import PlaceholderNoAssigneeIcon from "@mui/icons-material/AccountCircleTwoTone";
import RobotIcon from "@mui/icons-material/SmartToyOutlined";
import LeaveAComment from "./leaveAComment";

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

  const textActivity: { [key: string]: string } = {
    created: "created the issue",
    addedLabels: "added label",
    addedStatus: "added status",
    addedPriority: "added priority",
    changedStatus: "changed status",
    changedLabels: "changed label",
    changedPriority: "changed priority",
    titleUpdate: "updated the title of the issue",
    textUpdate: "updated the description of the issue",
    textAndTitleUpdate: "updated title and description of the issue",
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
          (activity: {
            creatorId: null | string;
            type: string;
            registeredAt: any;
            commentMessage?: string;
            assignedIssueToId?: string;
            fromMessage?: null | string;
            toMessage?: null | string;
          }) => {
            const assignedMemberToIssue =
              activity.creatorId !== null
                ? findAssigneedUserByIssueAssignedId(activity.creatorId)
                : false;
            const memberAssignedIssueObjectct = activity?.assignedIssueToId
              ? findAssigneedUserByIssueAssignedId(activity.assignedIssueToId)
              : null;
            return (
              <div className="timeline-item p-2">
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
                <div className="timeline-content">
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
                          <div className="from-message font-semibold">
                            {activity.fromMessage}
                          </div>
                        )}
                        {activity.fromMessage != null &&
                          activity.toMessage != null && (
                            <div className="to-message">to</div>
                          )}
                        {activity.toMessage != null && (
                          <div className="to-conclusion-message font-semibold">
                            {activity.toMessage}
                          </div>
                        )}
                      </div>
                    )}

                  {activity.type === "comment" &&
                    typeof activity.commentMessage === "string" && (
                      <div className="comment-container shadow-md p-2">
                        <div className="text-comment-container">
                          {activity.commentMessage}
                        </div>
                      </div>
                    )}
                  {activity.registeredAt != null && (
                    <div className="humanize-date text-gray-600">
                      {moment(activity.registeredAt.toDate()).fromNow()}
                    </div>
                  )}
                </div>
                <div className="time-line__line-history h-8 bg-gray-200 w-1 ml-2"></div>
              </div>
            );
          }
        )}

        <div className="timeline-item">
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
          <div className="timeline-content">
            <div className="input-comment">
              <div className="call-to-action-label text-gray-500">
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
    </div>
  );
}

// {/* <Timeline>
// {issueActivity.map(
//   (activity: {
//     creatorId: null | string;
//     type: string;
//     registeredAt: any;
//     commentMessage?: string;
//     assignedIssueToId?: string;
//     fromMessage?: null | string;
//     toMessage?: null | string;
//   }) => {
//     const assignedMemberToIssue =
//       activity.creatorId !== null
//         ? findAssigneedUserByIssueAssignedId(activity.creatorId)
//         : false;
//     const memberAssignedIssueObjectct = activity?.assignedIssueToId
//       ? findAssigneedUserByIssueAssignedId(activity.assignedIssueToId)
//       : null;
//     return (
//       <TimelineItem>
//         <TimelineSeparator>
//           {assignedMemberToIssue !== false && (
//             <div className="creator-container">
//               {assignedMemberToIssue !== null &&
//                 assignedMemberToIssue.photoURL != null && (
//                   <div className="assignee-exists flex items-center gap-2">
//                     <div className="assignee-icon">
//                       <Avatar
//                         src={assignedMemberToIssue.photoURL}
//                         sx={{ width: 19, height: 19 }}
//                         alt=""
//                       />
//                     </div>
//                     <div className="assignee-name text-xs flex gap-1">
//                       <div className="firstName">
//                         {assignedMemberToIssue.firstName}
//                       </div>
//                       <div className="lastName">
//                         {assignedMemberToIssue.lastName}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//               {assignedMemberToIssue === null && (
//                 <div className="assignee-placeholder flex items-center gap-2">
//                   <div className="assignee-icon">
//                     <PlaceholderNoAssigneeIcon />
//                   </div>
//                   <div className="assignee-name">Assignee</div>
//                 </div>
//               )}
//             </div>
//           )}
//           {activity.type === "created" && activity.creatorId == null && (
//             <div className="flex gap-2">
//               <RobotIcon />
//               <div className="app-name flex gap-2">
//                 <div>Reduce</div>
//                 <div>Issues</div>
//               </div>
//             </div>
//           )}

//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent>
//           {textActivity[activity.type] != null &&
//             activity.type !== "comment" && (
//               <div className="message-container flex gap-4">
//                 <div className="base-message">
//                   {textActivity[activity.type]}
//                 </div>
//                 {memberAssignedIssueObjectct != null && (
//                   <div className="assgined-issue-to">
//                     {
//                       <div className="assigned-to-container">
//                         <div className="assignee-exists flex items-center gap-2">
//                           <div className="assignee-icon">
//                             {memberAssignedIssueObjectct.photoURL !=
//                               null && (
//                               <Avatar
//                                 src={
//                                   memberAssignedIssueObjectct.photoURL
//                                 }
//                                 sx={{ width: 19, height: 19 }}
//                                 alt=""
//                               />
//                             )}
//                             {memberAssignedIssueObjectct.photoURL ==
//                               null && (
//                               <div className="assignee-icon">
//                                 <PlaceholderNoAssigneeIcon />
//                               </div>
//                             )}
//                           </div>
//                           <div className="assignee-name text-xs flex gap-1">
//                             <div className="firstName">
//                               {memberAssignedIssueObjectct.firstName}
//                             </div>
//                             <div className="lastName">
//                               {memberAssignedIssueObjectct.lastName}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     }
//                   </div>
//                 )}
//                 {activity.fromMessage != null && (
//                   <div className="from-message font-semibold">
//                     {activity.fromMessage}
//                   </div>
//                 )}
//                 {activity.fromMessage != null &&
//                   activity.toMessage != null && (
//                     <div className="to-message">to</div>
//                   )}
//                 {activity.toMessage != null && (
//                   <div className="to-conclusion-message font-semibold">
//                     {activity.toMessage}
//                   </div>
//                 )}
//               </div>
//             )}

//           {activity.type === "comment" &&
//             typeof activity.commentMessage === "string" && (
//               <div className="comment-container shadow-md p-2">
//                 <div className="text-comment-container">
//                   {activity.commentMessage}
//                 </div>
//               </div>
//             )}
//           {activity.registeredAt != null && (
//             <div className="humanize-date text-gray-600">
//               {moment(activity.registeredAt.toDate()).fromNow()}
//             </div>
//           )}
//         </TimelineContent>
//       </TimelineItem>
//     );
//   }
// )}

// <TimelineItem>
//   <TimelineSeparator>
//     <div className="current-logged-user-avatar flex gap-2">
//       {/* authUser.uid */}
//       {authUser.photoURL != null && (
//         <Avatar
//           src={authUser.photoURL}
//           sx={{ width: 19, height: 19 }}
//           alt=""
//         />
//       )}
//       {authUser.photoURL == null && (
//         <div className="assignee-icon">
//           <PlaceholderNoAssigneeIcon />
//         </div>
//       )}
//       <div className="current-user-details text-center">
//         <div className="first-name">
//           {shortUserName} {"(Me)"}
//         </div>
//       </div>
//     </div>
//   </TimelineSeparator>
//   <TimelineContent>
//     <div className="input-comment">
//       <div className="call-to-action-label text-gray-500">
//         Leave a comment...
//       </div>
//       <LeaveAComment
//         issueId={issueId}
//         teamId={teamId}
//         workspaceId={workspaceId}
//       />
//     </div>
//   </TimelineContent>
// </TimelineItem>
// </Timeline> */}
