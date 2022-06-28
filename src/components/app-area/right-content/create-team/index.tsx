import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOneTeam } from "../../../../api/dataBaseTeamsMethods";
import { addATeamInTeamList } from "./../../../../store/team";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

interface CreateNewTeamProps {}

const CreateNewTeam: React.FC<CreateNewTeamProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state: any) => state.auth.user);
  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );

  const [disabledRequestButton, setDisabledRequestButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [teamInputName, setTeamInputName] = useState("");

  const [teamInputIdentified, setTeamInputIdentified] = useState("");

  async function createNewTeam() {
    // create team and add it to the store
    setLoading(true);
    setDisabledRequestButton(true);
    if (
      teamInputName === "" ||
      teamInputName === null ||
      teamInputIdentified.trim() === "" ||
      teamInputIdentified === null ||
      teamInputIdentified.length > 3
    ) {
      setErrorMessage("Invalid inputs");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    const { error, data, teamObject } = await createOneTeam(
      teamInputName,
      selectedWorkspace,
      authUser,
      teamInputIdentified
    );

    setLoading(false);
    setDisabledRequestButton(false);

    if (error) {
      setErrorMessage("Could create the team");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    dispatch(
      addATeamInTeamList({
        teamObject: { id: data.id, registeredAt: new Date(), ...teamObject },
      })
    );

    navigate(
      `reduce-issues/${selectedWorkspace.workspaceURL}/team/${teamInputIdentified}/all`
    );

    // then will make a dispatch to only to add a team to the team list that will cause the useEffect to
    // trigger(from index of folder right-content)
    //and when that happen he will make an watch for the non existing issue subCollection :) ,
    //but no worry just add something and firebase
    // is smart enough to react to the now existing subcollection
  }

  return (
    <div>
      {selectedWorkspace.id == null && <div>You do not have a workspace</div>}
      {selectedWorkspace.id != null && (
        <div className="create-new-team-container m-10">
          <div className="create-new-team-container__header-container border-b pb-8">
            <div className="create-new-team-container__header-container--header">
              <div className="first-title">Create a new team</div>
              <div className="second-title font-serif text-gray-700 ml-4">
                Create a new team to the current workspace so you can easily
                manage your issues
              </div>
            </div>
          </div>
          <div className="create-new-team-container__inputs-container mt-9">
            <div className="text-area-container">
              <div className="team-name-container">
                <div className="title">Team name:</div>
                <textarea
                  onChange={(event) => {
                    setTeamInputName(event.target.value);
                  }}
                  className="text-2xl w-8/12 h-12 shadow-md  p-2  border overflow-hidden break-words rounded-md resize-none border-gray-200 transition-all ease-in-out"
                  value={teamInputName}
                ></textarea>
              </div>
              <div className="team-identifier-container">
                <div className="title">Team identifier</div>
                <textarea
                  onKeyDown={(event) => {
                    if (teamInputIdentified?.length <= 3) return;
                    // this one is here in case you copy paste somehow  a large text , and you want to delete it
                    if (event.key === "Backspace" || event.key === "Delete")
                      setTeamInputIdentified(
                        teamInputIdentified.slice(
                          0,
                          teamInputIdentified.length - 1
                        )
                      );
                  }}
                  onChange={(event) => {
                    if (
                      teamInputIdentified.length >= 3 &&
                      event.target.value.length >= 3
                    )
                      return;
                    setTeamInputIdentified(event.target.value.toUpperCase());
                  }}
                  className="text-2xl border-gray-200  shadow-md h-12 p-2  border overflow-hidden break-words rounded-md resize-none transition-all ease-in-out"
                  value={teamInputIdentified}
                ></textarea>
              </div>
            </div>
            <div className="error-message-contianer">
              {errorMessage == null && (
                <div className="placeholder-container invisible py-2">
                  Placeholder
                </div>
              )}
              {errorMessage != null && (
                <div className="error-message-container py-2">
                  {errorMessage}
                </div>
              )}
            </div>
            <div className="submit-container">
              <LoadingButton
                disabled={disabledRequestButton}
                style={{ fontWeight: 600 }}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={createNewTeam}
              >
                {!loading ? "Create Team" : "Saveing"}
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewTeam;
