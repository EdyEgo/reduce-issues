import { Link } from "react-router-dom";
import Profile from "./profile";
interface LeftSideMenuProps {}

const LeftSideMenu: React.FC<LeftSideMenuProps> = () => {
  return (
    <>
      <div className="flex justify-between profile-row">
        <Profile />
      </div>
    </>
  );
};

export default LeftSideMenu;
