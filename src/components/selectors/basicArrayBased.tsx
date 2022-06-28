import * as React from "react";

import MenuItem from "@mui/material/MenuItem";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
// import ExtractFitIcon from "./helpers/extractFitIcon";
import ExtractFitIconNoDinamic from "./helpers/extractFitIconNoDinamic";
import NoLabelSelected from "@mui/icons-material/MoreHorizOutlined";

interface SelectProps {
  itemsList: { name: string; icon: string }[];
  setSelectedItem: (argument: any) => void;
  selectedItem: { index: number; icon: string; name: string } | null;
  labelTitle: string;
  disableButton: boolean;
}

const SelectAutoWidth: React.FC<SelectProps> = ({
  itemsList,
  setSelectedItem,
  selectedItem,
  labelTitle,
  disableButton,
}) => {
  function returnElementOption(item: { icon: string; name: string }) {
    const { icon, name } = item;

    return (
      <div className="member-option pointer-events-none flex gap-2">
        <div className="icon-container">
          <div className="icon"></div>
          {/* <React.Suspense fallback={<div className=""></div>}>

            {ExtractFitIcon({ iconName: icon })}
          </React.Suspense> */}
          {ExtractFitIconNoDinamic({
            iconName: icon,
            index: Math.random() + Math.random(),
          })}
        </div>
        <div className="name-container ">
          <div className="label-name">{name}</div>
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
    if (itemsList.length <= 0) return null;

    const membersList = itemsList.map((item, index) => {
      return (
        <MenuItem
          key={index}
          value={index}
          onClick={() => {
            setSelectedItem({ ...item, index });
            handleClose();
          }}
        >
          {returnElementOption(item)}
        </MenuItem>
      );
    });
    // add here an icon // left here
    membersList.unshift(
      <MenuItem
        key={1 + Math.random()}
        value={-1}
        onClick={() => {
          setSelectedItem(null);
          handleClose();
        }}
      >
        {labelTitle}
      </MenuItem>
    );

    return membersList;
  }

  return (
    <div>
      <Button
        className="mx-2"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={disableButton}
      >
        {selectedItem === null && (
          <div className="no-label-container flex gap-2 ">
            <div className="icon-container">
              <NoLabelSelected />
            </div>
            <div className="label-name">{labelTitle}</div>
          </div>
        )}
        {selectedItem !== null && typeof selectedItem?.index === "number" && (
          <MenuItem value={selectedItem.index}>
            {returnElementOption(selectedItem)}
          </MenuItem>
        )}
      </Button>

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
    </div>
  );
};

export default SelectAutoWidth;
