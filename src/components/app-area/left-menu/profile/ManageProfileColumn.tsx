import { useSelector, useDispatch } from "react-redux";

import { useState, useRef } from "react";

import DropDownProfileMenu from "./dropDownProfile";

import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

interface ManageProfileColumnProps {}

const ManageProfileColumn: React.FC<ManageProfileColumnProps> = () => {
  const authStore = useSelector((state: any) => state.auth);
  const userObject = useSelector((state: any) => state.auth.user);

  // if the photoURL is present but the img gives an error , on img error this will be set to true ..
  // ..so you can have the avatar default img as if the user is not haveing an img URL
  const [hideBrokenProfileImgWithSrc, setHideBrokenProfileImgWithSrc] =
    useState(false);

  const [open, setOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <div
        className="user-profile-picture-container hover:bg-gray-200 rounded-md p-1 transition-all ease"
        ref={anchorRef}
        onClick={handleToggle}
      >
        {userObject?.photoURL == null && (
          <div className="no-profile-picture p-1">
            <AccountCircleSharpIcon />
          </div>
        )}
        {userObject?.photoURL == null ||
          (hideBrokenProfileImgWithSrc && (
            <div className="no-profile-picture p-1">
              <AccountCircleSharpIcon />
            </div>
          ))}

        {userObject?.photoURL && hideBrokenProfileImgWithSrc === false && (
          <div className="profile-picture p-1 flex justify-center items-center">
            <img
              alt={"profile"}
              src={userObject.photoURL}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping (not really /:} )
                // currentTarget.src="image_path_here";
                setHideBrokenProfileImgWithSrc(true);
              }}
              className="rounded-full max-w-5 max-h-5"
            />
          </div>
        )}

        <DropDownProfileMenu
          open={open}
          setOpen={setOpen}
          anchorRef={anchorRef}
        />
      </div>
    </>
  );
};

export default ManageProfileColumn;
