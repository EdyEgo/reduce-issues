import { BrowserRouter as Router } from "react-router-dom";
import { signOut } from "../../api/dataBaseAuthMethods";
import LeftMenu from "./left-menu";
import RightContent from "./right-content";

interface AppAreaProps {}

async function signMeOut() {
  await signOut();
}

const AppArea: React.FC<AppAreaProps> = () => {
  return (
    <>
      <button onClick={signMeOut}>Sign Out</button>

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
