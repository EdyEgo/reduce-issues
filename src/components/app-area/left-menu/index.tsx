import Profile from "./profile";
import CreateIssueRow from "./create-issue";
import FilteredIssues from "./filteredIssues";
import YourTeams from "./your-teams";

interface LeftSideMenuProps {}

const LeftSideMenu: React.FC<LeftSideMenuProps> = () => {
  return (
    <>
      <div className="left-side-continer border-r px-2 h-full">
        <div className="profile-row flex justify-between">
          <Profile />
        </div>
        <div className="create-new-issue-row">
          <CreateIssueRow />
        </div>
        <div className="filtered-issue-row">
          <FilteredIssues />
        </div>
        <div className="your-teams-row">
          {/* load only the teams that you are a part of , if you are the owner of the workspace then 
        load all the teams from that workspace
        */}
          <YourTeams />
        </div>
      </div>
    </>
  );
};

export default LeftSideMenu;
