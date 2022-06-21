import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changenewIssueModalOpenStatus } from "../../../../store/issues";
import MagnifyingGlass from "@mui/icons-material/Search";
import WritePen from "@mui/icons-material/DriveFileRenameOutline";

interface CreateNewIssueProps {}

const CreateNewIssue: React.FC<CreateNewIssueProps> = () => {
  const selectedWorkspaceUrl = useSelector(
    (state: any) => state.workspace.selectedWorkSpace.workspaceURL
  );
  const dispatch = useDispatch();

  function openNewIssueModal() {
    dispatch(changenewIssueModalOpenStatus({ open: true }));
  }

  return (
    <>
      <div className="create-issue-content-container flex justify-between items-center ">
        <div
          onClick={openNewIssueModal}
          className="left-menu-new-issue-btn cursor-pointer text-gray-700 hover:text-gray-900 flex gap-2 ml-2  my-4 border rounded-md py-1 px-2 hover:bg-gray-100 "
        >
          <span>
            <WritePen className="pointer-events-none" />
          </span>
          <span className="pointer-events-none">Create a new Issue </span>
        </div>
        <Link
          className="search-btn   my-4 border rounded-md py-1 px-2 hover:bg-gray-100 hover:text-gray-900 text-gray-700"
          to={selectedWorkspaceUrl + "/search"}
        >
          <MagnifyingGlass className="pointer-events-none" />
        </Link>
      </div>
    </>
  );
};

export default CreateNewIssue;
