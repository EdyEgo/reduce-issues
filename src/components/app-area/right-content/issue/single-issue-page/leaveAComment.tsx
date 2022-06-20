import { useState } from "react";
import { updateIssueComment } from "../../../../../api/dataBaseIssuesMethods";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

interface LeaveACommentToIssueProps {
  issueId: string;
  teamId: string;
  workspaceId: string;
}

const LeaveACommentToIssue: React.FC<LeaveACommentToIssueProps> = ({
  issueId,
  teamId,
  workspaceId,
}) => {
  const [commentText, setCommentText] = useState("");
  const authUser = useSelector((state: any) => state.auth.user);
  // const updateResult = await addIssueComment({
  //     inputObject: {

  //     },
  //     issueId: issueObject.id,
  //     teamId: issueObject.teamId,
  //     workspaceId: selectedWorkspace.id,

  //     addToActivity,
  //   });

  async function updateCommentWithLoggedUser() {
    if (commentText === "") return "";
    const addToActivity = {
      creatorId: authUser.uid,
      commentMessage: commentText,
      type: "comment",
      registeredAt: new Date(),
    };
    const { error } = await updateIssueComment({
      addToActivity,
      issueId,
      teamId,
      workspaceId,
    });

    setCommentText("");
  }

  return (
    <div className="leave-a-comment-to-issue-container">
      <div className="leave-a-comment-input">
        <textarea
          onChange={(event) => {
            setCommentText(event.target.value);
          }}
          className="w-full leading-6  border overflow-hidden break-words rounded-md resize-none border-white transition-all ease-in-out"
          value={commentText}
        ></textarea>
      </div>
      <div className="leave-a-comment-footer">
        <Button
          size="small"
          variant="outlined"
          onClick={updateCommentWithLoggedUser}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default LeaveACommentToIssue;
