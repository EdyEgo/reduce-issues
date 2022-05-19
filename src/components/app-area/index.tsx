import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useStore, useSelector, useDispatch } from "react-redux";
import { getUser, getUsers } from "../../api/dataBaseUsersMethods";
import { changeCurrentUser } from "../../store/users";
import LeftMenu from "./left-menu";
import RightContent from "./right-content";

interface AppAreaProps {}

// take the user object so you can have the selected workspace id
// then load the workspace

const AppArea: React.FC<AppAreaProps> = () => {
  const dispatch = useDispatch();
  const usersStore = useSelector((state: any) => state.users);
  const authStore = useSelector((state: any) => state.auth);

  async function getCurrentUserAndSave() {
    const currentUser = authStore.user;
    const currentUserObject = await getUser({ userId: currentUser.uid });
    if (currentUserObject.exists()) {
      const currentUserDataObject = currentUserObject.data();
      dispatch(changeCurrentUser(currentUserDataObject));
      console.log("current user fetched", currentUserDataObject);
      return currentUserObject;
    }
    throw new Error("Could not fetch user");
  }

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      const userData = getCurrentUserAndSave().catch((error: Error) =>
        console.log("error on loading current user object ", error.message)
      );
      // get workspace data , ex userData.workSpaceSelected.id , then fetch it
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
