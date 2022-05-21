import { useStore, useSelector, useDispatch } from "react-redux";
import DropDownProfileMenu from "./dropDownProfile";
import { useRef, useState } from "react";

interface ManageWorkspaceColumnProps {}

const ManageWorkspaceColumn: React.FC<ManageWorkspaceColumnProps> = () => {
  const dispatch = useDispatch();
  const usersStore = useSelector((state: any) => state.users);
  const authStore = useSelector((state: any) => state.auth);
  const workspaceStore = useSelector((state: any) => state.workspace);
  const selectedWorkSpace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );

  const [open, setOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function returnWorkspaceNameMaxLength() {
    if (selectedWorkSpace.name.length > 15) {
      return selectedWorkSpace.name.slice(0, 16) + "..";
    }
    return selectedWorkSpace.name;
  }

  return (
    <>
      <div
        className="workspace-column-container"
        ref={anchorRef}
        onClick={handleToggle}
      >
        <div className="workspace-column-picture">
          {selectedWorkSpace.photoURL !== null && (
            <img src={selectedWorkSpace.photoURL} alt="" />
          )}
          {selectedWorkSpace.photoURL === null && (
            <span className="p-2 bg-orange-600">
              {selectedWorkSpace.name[0].toUpperCase() +
                selectedWorkSpace.name[1].toUpperCase()}
            </span>
          )}
        </div>
        <div className="workspace-coulumn-name" title={selectedWorkSpace.name}>
          {returnWorkspaceNameMaxLength()}
        </div>
        <DropDownProfileMenu
          open={open}
          setOpen={setOpen}
          anchorRef={anchorRef}
        />
      </div>
    </>
  );
};

export default ManageWorkspaceColumn;
