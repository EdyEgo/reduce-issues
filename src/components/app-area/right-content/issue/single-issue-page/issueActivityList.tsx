import IssueTimeline from "./issueActivityTimeline";

interface IssueActivityListProps {
  activity:
    | null
    | {
        actionType: string;
        creatorId: null | string;
        type: string;
        registeredAt: any;
      }[];
  issueId: string;
  teamId: string;
  workspaceId: string;
}

const IssueActivityList: React.FC<IssueActivityListProps> = ({
  activity,
  issueId,
  teamId,
  workspaceId,
}) => {
  // create a list of icons , for each piece of history/activity we'll have a different icon
  // on created the user avatar or a placeholder , and for labels(status/priority/label) an icon
  // for text or title updated will have just a pen

  // if there is a creatorId but the id was not found then show deleted user
  // anyway you are gonna delete a user from a team but not from the workspace(the workspace only remembers the ids of the users)

  return (
    <div className="issue-activity-list">
      {activity != null && activity.length >= 1 && (
        <IssueTimeline
          issueActivity={activity}
          issueId={issueId}
          teamId={teamId}
          workspaceId={workspaceId}
        />
      )}
    </div>
  );
};

export default IssueActivityList;
