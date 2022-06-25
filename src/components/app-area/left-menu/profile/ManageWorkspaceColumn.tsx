import { useStore, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DropDownWorkspace from "./dropDownWorkSpace";
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

  function returnWorkspaceNameMaxLength() {
    if (selectedWorkSpace?.name == null) return "No existing workspace!!!";
    if (selectedWorkSpace.name.length > 15) {
      return selectedWorkSpace.name.slice(0, 16) + "..";
    }
    return selectedWorkSpace.name;
  }

  // const workspaceMenuList: any = [
  //   {
  //     type: "MenuItem",
  //     name: authStoreEmail,
  //     children: [{ ma: "frate" }, { idk: "2" }],
  //     id: 1,
  //   },

  //   {
  //     type: "MenuItem",
  //     name: "",
  //     isLine: true,
  //     id: 2,
  //   },
  //   {
  //     type: "Link",
  //     to: "/addworkspace",
  //     name: "Create a new workspace",
  //     id: 3,
  //   },
  //   {
  //     type: "MenuItem",
  //     name: "",
  //     isLine: true,
  //     id: 4,
  //   },
  //   {
  //     type: "MenuItem",
  //     name: "Log out",
  //     action: logUserOut,
  //     id: 5,
  //   },
  // ];

  // function createWorkspaceMenuList() {
  //   const objectList = Object.entries(workspaces);
  //   if (objectList.length <= 0) return;
  //   workspaceMenuList[0].children = objectList.map((workspace: any, index) => {
  //     return {
  //       type: "Link",
  //       name: workspace[1].name,
  //       to: workspace[1].workspaceURL,
  //       id: index,
  //     };
  //   });
  // }
  // useEffect(() => {
  //   let isSubscribed = true;

  //   if (isSubscribed) {
  //     createWorkspaceMenuList();
  //   }

  //   return () => {
  //     isSubscribed = false;
  //   };
  // }, [workspaces]);

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
        <DropDownWorkspace
          open={open}
          setOpen={setOpen}
          anchorRef={anchorRef}
        />
      </div>
    </>
  );
};

export default ManageWorkspaceColumn;
