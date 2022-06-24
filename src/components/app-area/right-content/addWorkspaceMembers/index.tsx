import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { getUserByEmail } from "../../../../api/dataBaseUsersMethods";

interface AddWorkspaceMembersProps {}

const AddWorkspaceMembers: React.FC<AddWorkspaceMembersProps> = () => {
  const dispactch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [disabledRequestButton, setDisabledRequestButton] = useState(false);
  const [foundMembers, setFoundMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  ); //selectedWorkspace.membersId compare id with this when searching for members,so you don t have as
  // result an actual workspace member

  async function startSearchForNewWorkspaceMembers() {
    const trimedInputValue = searchInputValue.trim();
    if (trimedInputValue === "") return;
    setLoading(true);
    setDisabledRequestButton(true);

    if (!searchInputValue.includes("@")) return;

    const { error, data } = await getUserByEmail(trimedInputValue);
    if (error) {
      setLoading(false);
      setDisabledRequestButton(false);

      setErrorMessage("Could not access database!");

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    console.log("users found with this email are", data);
    setFoundMembers(data);

    setLoading(false);
    setDisabledRequestButton(false);
  }

  // if it contains an @ then search by email
  return (
    <div className="add-workspace-members-container px-28 mt-10">
      {selectedWorkspace != null && (
        <div className="content-container">
          <div className="nav-team-settings  p-8">
            <div className="about-container border-b pb-2 text-2xl">
              <div className="first-title">Add members to your workspace</div>
              <div className="second-title font-serif text-gray-700 ml-4">
                Add members that are registered to Reduce Issues
              </div>
            </div>
          </div>
          <div className="invite-container px-8 mt-10">
            <div className="search-for-members-container">
              <div className="header-title pb-8 text-lg">
                <div className="first-title">Search for a user email</div>
                <div className="second-title font-serif text-gray-700 ml-1">
                  Search for members that are in our database
                </div>
              </div>
              <div className="search-inputs flex gap-10 items-center">
                <div className="input-search-half w-8/12">
                  {/* <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    fullWidth
                  /> */}
                  <textarea
                    onChange={(event) => {
                      setSearchInputValue(event.target.value);
                    }}
                    className="text-2xl w-full h-12 shadow-md   border overflow-hidden break-words rounded-md resize-none border-gray-200 transition-all ease-in-out"
                    value={searchInputValue}
                  ></textarea>
                </div>
                <div className="submit-search-half h-12">
                  <LoadingButton
                    disabled={disabledRequestButton}
                    style={{ fontWeight: 100, padding: "0.6em" }}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={startSearchForNewWorkspaceMembers}
                  >
                    {!loading ? "Search" : "Searching"}
                  </LoadingButton>
                </div>
              </div>
              <div className="error-message-container">
                {errorMessage !== null && (
                  <div className="error-message">{errorMessage}</div>
                )}
                {errorMessage === null && (
                  <div className="error-message-placeholder invisible">
                    placeholder error
                  </div>
                )}
              </div>
            </div>
            {foundMembers.length > 1 && (
              <div className="found-members mt-10">
                <div className="header-title font-semibold">Found members</div>
                <div className="list"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedWorkspace != null && <div className="loading-container"></div>}
    </div>
  );
};

export default AddWorkspaceMembers;
