import * as React from "react";

import MenuItem from "@mui/material/MenuItem";

import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { returnShortVersionString } from "../../composables/generalHelpers/returnShorterWord";
import NoLabelSelected from "@mui/icons-material/MoreHorizOutlined";

interface SelectProps {
  teamMembersList: { [key: string]: any };
  setSelectedMember: (argument: any) => void;
  selectedMember: { name: string; photoURL: string | null; id: string | null };
  labelTitle: string;
  disableButton: boolean;
}

const SelectAutoWidth: React.FC<SelectProps> = ({
  teamMembersList,
  setSelectedMember,
  selectedMember,
  labelTitle,
  disableButton,
}) => {
  const workspaceMembers = useSelector((state: any) => state.workspace.members);

  function returnWorspaceMemberObjectById(id: string) {
    return workspaceMembers.find((member: any) => member.id === id);
  }

  const [hideBrokenProfileImgWithSrc, setHideBrokenProfileImgWithSrc] =
    React.useState(false);

  function returnElementOption(userObject: any, index: null | number) {
    return (
      <div className="member-option pointer-events-none flex gap-2" key={index}>
        <div className="profile-container">
          {userObject.photoURL == null && (
            <div className="no-profile-picture">
              <PersonIcon />
            </div>
          )}

          {userObject?.photoURL == null ||
            (hideBrokenProfileImgWithSrc && (
              <div className="no-profile-picture ">
                <PersonIcon />
              </div>
            ))}
          {userObject.photoURL && hideBrokenProfileImgWithSrc === false && (
            <div className="profile-picture ">
              <img
                alt={" "}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping (not really /:} )
                  // currentTarget.src="image_path_here";
                  setHideBrokenProfileImgWithSrc(true);
                }}
                src={userObject.photoURL}
                className="rounded-full max-w-5 max-h-5"
              />
            </div>
          )}
        </div>
        <div className="name-container flex gap-1">
          <div className="first-name">
            {returnShortVersionString(10, userObject.firstName)}{" "}
          </div>
          <div className="last-name">
            {returnShortVersionString(10, userObject.lastName)}
          </div>
        </div>
      </div>
    );
  }

  // setup

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function generateItemList() {
    const list = Object.entries(teamMembersList);
    if (list.length <= 0) return null;

    const membersList = list.map((item, index) => {
      const userObject = returnWorspaceMemberObjectById(item[0]);
      return (
        <MenuItem
          value={userObject}
          key={index}
          onClick={() => {
            setSelectedMember(userObject);
            handleClose();
          }}
        >
          {returnElementOption(userObject, index)}
        </MenuItem>
      );
    });
    const unassignedObject = {
      firstName: "Unassigned",
      lastName: "",
      photoURL: null,
      id: null,
    };
    membersList.unshift(
      <MenuItem
        key={1 + Math.random()}
        value={""}
        onClick={() => {
          setSelectedMember(unassignedObject);
          handleClose();
        }}
      >
        {returnElementOption(unassignedObject, null)}
      </MenuItem>
    );
    return membersList;
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={disableButton}
      >
        {selectedMember.id === null && (
          <div className="no-label-container flex gap-2">
            <div className="icon-container">
              <NoLabelSelected />
            </div>
            <div className="label-name">{labelTitle}</div>
          </div>
        )}
        {selectedMember.id !== null && (
          <MenuItem value={selectedMember.id}>
            {returnElementOption(selectedMember, null)}
          </MenuItem>
        )}
      </Button>
      {Object.entries(teamMembersList).length >= 1 && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {generateItemList()}
        </Menu>
      )}
    </div>
  );
};

export default SelectAutoWidth;
