import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useStore, useSelector, useDispatch } from "react-redux";
import { getUser, getUsers } from "../../api/dataBaseUsersMethods";
import {
  getWorkSpace,
  getWorkSpacesByIds,
} from "../../api/dataBaseWorkSpaceMethods";
import { getTeams } from "../../api/dataBaseTeamsMethods";
import { changeCurrentUser } from "../../store/users";
import {
  changeSelectedWorkSpace,
  changeUserWorkspaces,
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
  const selectedWorkSpace = useSelector(
    (state: any) => state.selectedWorkSpace
  );

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

  async function getCurrentSelectedWorkspaceAndSave(
    workspaceId: string,
    userWorkspace: { [key: string]: any }
  ) {
    const selectedWorkspaceObject = {
      ...userWorkspace[workspaceId],
      id: workspaceId,
    };
    dispatch(changeSelectedWorkSpace({ ...selectedWorkspaceObject }));
    return selectedWorkspaceObject;
  }

  async function getUserWorkSpaces(workspacesIds: {
    [key: string]: { role: string };
  }) {
    const documents: any = await getWorkSpacesByIds(workspacesIds);
    if (documents.error) throw new Error("Could not fetch workspaces");
    dispatch(changeUserWorkspaces(documents.data));

    return documents.data;
  }

  async function getCurrentTeamListForWorkspace(workspaceId: string) {
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
          console.log("BRLP");
          const selectedWorkspaceId = userData.data.workSpaceSelected.id;
          const userWorkSpaces = userData.data.workSpaces;

          // load user workspaces

          const collectionUserWorkspace = await getUserWorkSpaces(
            userWorkSpaces
          );

          // save the selected workspace object
          const workspaceData = await getCurrentSelectedWorkspaceAndSave(
            selectedWorkspaceId,
            collectionUserWorkspace
          );
          // load team data from workspace nested collection
          await getCurrentTeamListForWorkspace(selectedWorkspaceId);
          // load members list from data base in users collection
          await getSelectedWorkspaceMembersAndSave(workspaceData.membersId);
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [selectedWorkSpace]);

  return (
    <>
      {/* left menu will only change on selected and added staff like favorites and notifications on issues */}
      <Router>
        {/* links here */}
        <div className="flex app-side-content-container text-md mt-1">
          <div className="w-3/12 left-menu-container">
            <LeftMenu />
          </div>

          {/* add pagination to issues by date,use serverTimestamp */}
          {/* routes here */}
          <div className="w-10/12 right-content-container">
            <RightContent />
          </div>
        </div>
      </Router>
    </>
  );
};

export default AppArea;
