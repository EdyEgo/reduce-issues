import { useStore, useSelector, useDispatch } from "react-redux";
import { authSlice, changeErrorStatus } from "../../../../store/auth";
import { useState, useRef } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import DropDownProfileMenu from "./dropDownProfile";
import { signOut } from "../../../../api/dataBaseAuthMethods";

interface ManageProfileColumnProps {}

const ManageProfileColumn: React.FC<ManageProfileColumnProps> = () => {
  const authStore = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [photoUrl, setPhotoUrl] = useState(authStore.user?.photoURL);
  // const [photoUrl, setPhotoUrl] = useState(null);

  //{authStore.user.email} , photoURL , can be null or string

  // drop down menu logic

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
        {photoUrl == null && (
          <div className="no-profile-picture">
            <PersonIcon />
          </div>
        )}
        {photoUrl && (
          <div className="profile-picture ">
            {/* <Avatar alt={photoUrl} src={photoUrl} /> */}
            <img
              alt={photoUrl}
              src={photoUrl}
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
