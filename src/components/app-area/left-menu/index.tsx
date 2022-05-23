import { Link } from "react-router-dom";
import Profile from "./profile";
import CreateIssueRow from "./create-issue";
interface LeftSideMenuProps {}

const LeftSideMenu: React.FC<LeftSideMenuProps> = () => {
  return (
    <>
      <div className="profile-row flex justify-between">
        <Profile />
      </div>
      <div className="create-new-issue-row">
        <CreateIssueRow />
      </div>
    </>
  );
};

export default LeftSideMenu;
