import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
interface TeamSettingsProps {}

const TeamSettings: React.FC<TeamSettingsProps> = () => {
  const params = useParams();
  const teamURL = params.teamURL;

  const teamList = useSelector((state: any) => state.team.teamList);
  const teamIssuesList = useSelector((state: any) => state.issues.teamsIssues);
  const selectedTeam = findTeamByIdentifier();
  console.log("none", selectedTeam);

  function findTeamByIdentifier() {
    if (teamURL == null) return null;
    for (const teamValue of teamList) {
      if (teamValue.identified.toLowerCase() === teamURL.toLowerCase()) {
        return teamValue;
      }
    }
  }

  //   function findIssueInTeamsIssues() {
  //     //identified
  //     let issueObject = null;

  //     loopTeam: for (const teamId in teamIssuesList) {
  //       const teamIssuesValue = teamIssuesList[teamId];
  //       if (teamIssuesValue.length <= 0) continue;
  //       for (
  //         let issueIndex = 0;
  //         issueIndex < teamIssuesValue.length;
  //         issueIndex++
  //       ) {
  //         const issueValueObject = teamIssuesValue[issueIndex].identified;
  //         console.log("bruh", issueValueObject);
  //         // if (
  //         //   issueValueObject?.identified &&
  //         //   issueIdentified &&
  //         //   issueValueObject.identified.toLowerCase() ===
  //         //     issueIdentified.toLowerCase()
  //         // ) {
  //         //   issueObject = issueValueObject;
  //         //   break loopTeam;
  //         // }
  //       }
  //     }

  //     return issueObject;
  //   }

  return (
    <div className="team-settings-container">
      {selectedTeam != null && (
        <div className="content-container">
          <div className="nav-team-settings  p-8">
            <div className="about-container border-b pb-2 flex justify-start items-center">
              <div className="about-team ">
                <div className="team-name-title text-2xl">
                  {selectedTeam.name}
                </div>
                <div className="about-this-page text-gray-700">
                  Manage this team
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedTeam != null && <div className="loading-container"></div>}
    </div>
  );
};

export default TeamSettings;
