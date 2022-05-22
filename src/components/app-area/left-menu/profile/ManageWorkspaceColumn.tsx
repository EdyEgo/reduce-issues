import { useStore, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropDownProfileMenu from "./dropDownProfile";
import { useRef, useState, useEffect } from "react";
import { signOut } from "../../../../api/dataBaseAuthMethods";
import { changeErrorStatus } from "../../../../store/auth";

interface ManageWorkspaceColumnProps {}

const ManageWorkspaceColumn: React.FC<ManageWorkspaceColumnProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersStore = useSelector((state: any) => state.users);
  const authStoreEmail = useSelector((state: any) => state.auth.user.email);
  const workspaceStore = useSelector((state: any) => state.workspace);
  const workspaces = useSelector(
    (state: any) => state.workspace.userWorkspaces
  );
  const selectedWorkSpace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );

  const [open, setOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  async function logUserOut() {
    const result = await signOut();
    if (result.error) {
      dispatch(changeErrorStatus(result.error));
      return false;
    }
    navigate("/");
    return true;
  }

  function returnWorkspaceNameMaxLength() {
    if (selectedWorkSpace.name.length > 15) {
      return selectedWorkSpace.name.slice(0, 16) + "..";
    }
    return selectedWorkSpace.name;
  }

  const workspaceMenuList: any = [
    {
      type: "span",
      name: authStoreEmail,
      children: [],
    },
    // ...workspaces,

    {
      type: "span",
      name: "",
      isLine: true,
    },
    {
      type: "Link",
      to: "/addworkspace",
      name: "Create a new workspace",
    },
    {
      type: "span",
      name: "",
      isLine: true,
    },
    {
      type: "div",
      name: "Log out",
      action: logUserOut,
    },
  ];

  function createWorkspaceMenuList() {
    const objectList = Object.entries(workspaces);
    if (objectList.length <= 0) return;
    workspaceMenuList[0].children = objectList.map((workspace: any) => {
      return {
        type: "Link",
        name: workspace[1].name,
        to: workspace[1].workspaceURL,
      };
    });
  }
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      createWorkspaceMenuList();
      console.log("this one exe times", workspaceMenuList);
    }

    return () => {
      isSubscribed = false;
    };
  }, [workspaces]);

  return (
    <>
      <div
        className="workspace-column-container flex gap-2 items-center hover:bg-gray-200 p-1 cursor-pointer rounded-sm"
        onClick={handleToggle}
      >
        <div className="workspace-column-picture">
          {selectedWorkSpace.photoURL !== null && (
            <img src={selectedWorkSpace.photoURL} alt="" />
          )}
          {selectedWorkSpace.photoURL === null && (
            <span className="text-ls p-1 bg-red-400 rounded-sm text-white font-light">
              {selectedWorkSpace.name[0].toUpperCase() +
                selectedWorkSpace.name[1].toUpperCase()}
            </span>
          )}
        </div>
        <div
          className="workspace-coulumn-name"
          title={selectedWorkSpace.name}
          ref={anchorRef}
        >
          {returnWorkspaceNameMaxLength()}
        </div>
        <DropDownProfileMenu
          open={open}
          setOpen={setOpen}
          anchorRef={anchorRef}
          menuItemList={workspaceMenuList}
        />
      </div>
    </>
  );
};

export default ManageWorkspaceColumn;
