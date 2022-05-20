import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useStore, useSelector, useDispatch } from "react-redux";
import { getUser, getUsers } from "../../api/dataBaseUsersMethods";
import { getWorkSpace } from "../../api/dataBaseWorkSpaceMethods";
import { getTeams } from "../../api/dataBaseTeamsMethods";
import { changeCurrentUser } from "../../store/users";
import {
  changeSelectedWorkSpace,
  loadMembersToStore,
} from "../../store/workspace";
import { setTeamList } from "../../store/team";
import LeftMenu from "./left-menu";
import RightContent from "./right-content";

interface AppAreaProps {}

// take the user object so you can have the selected workspace id
// then load the workspace

const AppArea: React.FC<AppAreaProps> = () => {
  const dispatch = useDispatch();
  const usersStore = useSelector((state: any) => state.users);
  const authStore = useSelector((state: any) => state.auth);
  const workspaceStore = useSelector((state: any) => state.workspace);

  async function getCurrentUserAndSave() {
    const currentUser = authStore.user;
    const currentUserObject = await getUser({ userId: currentUser.uid });
    if (currentUserObject.error) throw new Error(currentUserObject.message);
    const currentUserDataObject = currentUserObject.data;
    dispatch(
      changeCurrentUser({ ...currentUserDataObject, id: currentUser.uid })
    );

    return currentUserObject;
  }

  async function getCurrentSelectedWorkspaceAndSave(workspaceId: string) {
    const document: any = await getWorkSpace(workspaceId);
    if (document.error) throw new Error(document.message);
    const workspaceData = document.data;
    dispatch(changeSelectedWorkSpace({ ...workspaceData, id: workspaceId }));

    return workspaceData;
  }

  async function getCurrentTeamForWorkspace(workspaceId: string) {
    const document = await getTeams(workspaceId);
    if (document.error) throw new Error(document.message);
    const teamData = document.data;

    dispatch(setTeamList(teamData));
    return teamData;
  }

  async function getSelectedWorkspaceMembersAndSave(usersIds: {
    [key: string]: any;
  }) {
    // load from db/users all members in this workspace

    const members = await getUsers({ usersIds });
    if (members.error) throw new Error(members.message);
    const teamMembersList = members.data;
    dispatch(loadMembersToStore(teamMembersList));
  }

  // load all memebers from the work space but add te members into the teams as they belong , so you can t assign a task to a non team member even if he/she is in the workspace

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      getCurrentUserAndSave()
        .catch((error: Error) =>
          console.log("error on loading current user object ", error.message)
        )
        .then(async (userData: any) => {
          const selectedWorkspaceId = userData.data.workSpaceSelected.id;

          const workspaceData = await getCurrentSelectedWorkspaceAndSave(
            selectedWorkspaceId
          );
          const teamData = await getCurrentTeamForWorkspace(
            selectedWorkspaceId
          );

          const workspaceMembers = await getSelectedWorkspaceMembersAndSave(
            workspaceData.membersId
          );
        });

      // get workspace data , ex userData.workSpaceSelected.id , then fetch it , get team from workspace , then for each team  , get his memebers,
      // or just add the members to the work space and get them from there
      // because a  member from worksspace can be in a team
      // ADD MEMBERS TO THE WORKSPACE
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      {/* left menu will only change on selected and added staff like favorites and notifications on issues */}
      <Router>
        {/* links here */}
        <div className="flex app-side-content-container">
          <div className="w-3/12 left-menu-container">
            <LeftMenu />
          </div>

          {/* add pagination to issues by date,use serverTimestamp */}
          {/* routes here */}
          <div className="w-9/12 right-content-container">
            <RightContent />
          </div>
        </div>
      </Router>
    </>
  );
};

export default AppArea;
