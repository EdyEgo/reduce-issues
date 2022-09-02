import { useSelector, useDispatch } from "react-redux";
import {
  changeSelectedTabAppAreaLink,
  changeSelectedTabAppAreaName,
  changeTabAreaStaticTabSelection,
  changeSeletedTeamId,
} from "../../../../store/selectedTab";
import { changeDrawerStateByDirectionId } from "../../../../store/drawers";

import { useNavigate } from "react-router-dom";

import MyIssueIcon from "@mui/icons-material/PersonPinOutlined";
import FaceIcon from "@mui/icons-material/Face";
import MyIssueFolderIcon from "@mui/icons-material/FolderShared";

interface FilteredIssuesProps {}

const FilteredIssues: React.FC<FilteredIssuesProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );

  function changeRouteToFilteredIssues() {
    const filteredIssuesLink = `/reduce-issues/${selectedWorkspace.workspaceURL}/filtered-issues`;

    dispatch(changeSelectedTabAppAreaLink(filteredIssuesLink));

    dispatch(changeSelectedTabAppAreaName("My Issues"));

    dispatch(changeSeletedTeamId(null));

    dispatch(changeTabAreaStaticTabSelection("isMyIssues"));

    dispatch(
      changeDrawerStateByDirectionId({
        direction: "left",
        newStatus: false,
      })
    );
    navigate(filteredIssuesLink);
  }

  return (
    <div className=" p-2 py-3">
      <div
        onClick={changeRouteToFilteredIssues}
        className="link-container cursor-pointer flex gap-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 p-2 rounded-md transition-all ease"
      >
        <MyIssueFolderIcon />

        <div className="my-issues-link">My issues</div>
      </div>
    </div>
  );
};

export default FilteredIssues;
