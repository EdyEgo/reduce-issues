// import {useSelector} from "react-redux"
// import {useState} from 'react'
// import moment from 'moment'
// import Avatar from '@mui/material/Avatar'
// import {countMyInProgressIssues} from '../../../../services/issues/filterIssues'

// interface ProfileDetailsProps {

// }

// const ProfileDetails: React.FC<ProfileDetailsProps> = () => {

// const [hideBrokenProfileImgWithSrc , setHideBrokenProfileImgWithSrc] = useState(false)
// const currentUser = useSelector((state:any)=>state.users.currentUser)
// const authUser = useSelector((state:any)=>state.auth.user)
// const teamIssues = useSelector((state:any)=>state.issues.teamsIssues)
// const workingOnIssuesNumber = countMyInProgressIssues({loggedUserId:authUser.uid,teamIssues})

// function stringAvatar(name: string) {
//     return {
//       sx: {
//         bgcolor: "blue",
//       },
//       children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
//   }

//     return (
//     <div className="profile-details-container border-l mt-6 flex flex-col items-center">
//        <div className="card-details">
//            User Details
//        </div>
//        <div className="auth-user-container flex items-center p-2 gap-2">
//            <div className="left-side-avatar ">
//                  {typeof currentUser.photoURL === "string" &&
//                     hideBrokenProfileImgWithSrc === false &&
//                     <img
//                     alt={"profile"}
//                     src={currentUser.photoURL}
//                     onError={({ currentTarget }) => {
//                       currentTarget.onerror = null; // prevents looping (not really /:} )
//                       // currentTarget.src="image_path_here";
//                       setHideBrokenProfileImgWithSrc(true)
//                     }}
//                     className="rounded-full max-w-10 max-h-10"
//                   />
//                  }

//                 {currentUser?.photoURL == null || hideBrokenProfileImgWithSrc && (
//                 <div className="no-profile-picture">
//                     <Avatar {...stringAvatar(`${currentUser.firstName[0]} ${currentUser.lastName[0]}`)} />
//                 </div>
//                 )}

//            </div>
//            <div className="right-side-details">
//                <div className="user-name">
//                    {currentUser.firstName} {currentUser.lastName}
//                </div>
//                <div className="email text-gray-700">
//                    {currentUser.email}
//                </div>
//            </div>
//        </div>

//        <div className="user-app-details">
//            <div className="joined-column flex gap-2">
//                <div>Joined </div>
//                <div> { moment(currentUser.registeredAt.toDate()).fromNow() }</div>

//            </div>

//            {workingOnIssuesNumber >=1 &&
//            <div className="working-on flex gap-2">
//                 <div>Working on</div>
//                <div>{workingOnIssuesNumber}
//                { workingOnIssuesNumber > 1 && workingOnIssuesNumber !== 0?" issues": " issue"}

//                </div>
//            </div>}
//            {
//                workingOnIssuesNumber === 0 &&
//                <div className="does-not-work-on-issues text-red-300">
//                    <div>Has no issue in progress</div>
//                </div>
//            }

//            {/* <div className="assigned-prioritys">
//                <div>Assigned</div>
//                <div>
//                    prioritys here
//                </div>
//            </div> */}
//        </div>

//        {/* <div className="teams-list">
//           <div className="team-list-column flex gap-2">
//                <div>Teams</div>
//                <div> team list here</div>

//            </div>
//        </div> */}

//     </div> );
// }

// export default ProfileDetails;

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import { countMyInProgressIssues } from "../../../../services/issues/filterIssues";
import { changeProfileBarStatus } from "../../../../store/profile";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(true);
  const dispatch = useDispatch();
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      //   setState(false);
      dispatch(changeProfileBarStatus());
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [hideBrokenProfileImgWithSrc, setHideBrokenProfileImgWithSrc] =
    useState(false);
  const currentUser = useSelector((state: any) => state.users.currentUser);
  const authUser = useSelector((state: any) => state.auth.user);
  const profileLeftMenuStatus = useSelector(
    (state: any) => state.profile.profileStatus
  );
  const teamIssues = useSelector((state: any) => state.issues.teamsIssues);
  const workingOnIssuesNumber = countMyInProgressIssues({
    loggedUserId: authUser.uid,
    teamIssues,
  });

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: "blue",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={profileLeftMenuStatus}
        onClose={toggleDrawer("right", false)}
      >
        <div className="profile-details-container mt-6 flex flex-col items-center mx-4 cursor-default">
          <div className="card-details self-start ml-2">User Details</div>
          <div className="auth-user-container flex items-center p-2 gap-2 my-4">
            <div className="left-side-avatar ">
              {typeof currentUser.photoURL === "string" &&
                hideBrokenProfileImgWithSrc === false && (
                  <img
                    alt={"profile"}
                    src={currentUser.photoURL}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping (not really /:} )
                      // currentTarget.src="image_path_here";
                      setHideBrokenProfileImgWithSrc(true);
                    }}
                    className="rounded-full max-w-10 max-h-10"
                  />
                )}

              {currentUser?.photoURL == null ||
                (hideBrokenProfileImgWithSrc && (
                  <div className="no-profile-picture">
                    <Avatar
                      {...stringAvatar(
                        `${currentUser.firstName[0]} ${currentUser.lastName[0]}`
                      )}
                    />
                  </div>
                ))}
            </div>
            <div className="right-side-details">
              <div className="user-name">
                {currentUser.firstName} {currentUser.lastName}
              </div>
              <div className="email text-gray-700">{currentUser.email}</div>
            </div>
          </div>

          <div className="user-app-details my-4">
            <div className="joined-column flex gap-2 justify-between my-4">
              <div className="text-green-400">Joined </div>
              <div> {moment(currentUser.registeredAt.toDate()).fromNow()}</div>
            </div>

            {workingOnIssuesNumber >= 1 && (
              <div className="working-on flex gap-2 justify-between">
                <div className=" text-yellow-600">Working on</div>
                <div>
                  {workingOnIssuesNumber}
                  {workingOnIssuesNumber > 1 && workingOnIssuesNumber !== 0
                    ? " issues"
                    : " issue"}
                </div>
              </div>
            )}
            {workingOnIssuesNumber === 0 && (
              <div className="does-not-work-on-issues text-red-300">
                <div>Has no issue in progress</div>
              </div>
            )}

            {/* <div className="assigned-prioritys">
               <div>Assigned</div>
               <div> 
                   prioritys here
               </div>
           </div> */}
          </div>

          {/* <div className="teams-list">
          <div className="team-list-column flex gap-2">
               <div>Teams</div>
               <div> team list here</div>
              
              
           </div>
       </div> */}
        </div>
      </Drawer>
    </div>
  );
}
