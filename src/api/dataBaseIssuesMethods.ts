import { postNewDocument } from "../composables/firebase/post/postDocument";
import { deleteLevelThreeNestedDocumentFirebase } from "../composables/firebase/delete/deleteDocument";
import { getTeamIssuesFirebase } from "../composables/firebase/issues/getTeamIssues";
import { postMultipleFiles } from "./dataBaseStorageMethods";
import {
  serverTimestamp,
  writeBatch,
  increment,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../firebase";
import type { Issue } from "../types/issues";
import { getOneTeam } from "./dataBaseTeamsMethods";

interface ActionTypeIssue {
  iconType: string; //can be userAvatar or any other icon
  actionMessage: string; // changed status , self-assigned etc
  fromMessage: string | null;
  toMessage: string | null;
}

interface CommentTypeIssue {
  picturesURL: string[] | null;
  text: string;
}

function returnFitLabelsObject(newIssueObject: Issue, decrement?: boolean) {
  const fitLabels: any = {};
  const numberValue = decrement != null ? -1 : 1;
  if (newIssueObject.status !== null)
    fitLabels["createdStatus"] = {
      [newIssueObject.status.icon]: increment(numberValue),
    };

  if (newIssueObject.priority !== null)
    fitLabels["createdPriority"] = {
      [newIssueObject.priority.icon]: increment(numberValue),
    };

  if (newIssueObject.label !== null)
    fitLabels["createdLabel"] = {
      [newIssueObject.label.icon]: increment(numberValue),
    };

  if (newIssueObject.assignedToUserId !== null)
    fitLabels["assignedIssues"] = increment(numberValue);

  if (newIssueObject.assignedToUserId === null)
    fitLabels["unassignedIssues"] = increment(numberValue);

  return fitLabels;
}

export async function updateIssueComment({
  addToActivity,
  issueId,
  teamId,
  workspaceId,
}: {
  workspaceId: string;
  addToActivity: any;
  teamId: string;
  issueId: string;
}) {
  try {
    await postNewDocument({
      collectionSelected: `workspaces/${workspaceId}/teams/${teamId}/issues`,
      documentName: issueId,
      noRegister: true,
      inputObject: {
        activity: arrayUnion({ ...addToActivity, registeredAt: new Date() }),
      },
    });
    return { error: false };
  } catch (e: any) {
    return { error: true, message: "Could not update the issue" };
  }
}

export async function updateIssue({
  inputObject,
  addToActivity,
  issueId,
  teamId,
  workspaceId,
}: {
  workspaceId: string;
  addToActivity?: any;
  teamId: string;
  issueId: string;
  inputObject: any;
}) {
  try {
    const inputObjectForUpdate = { ...inputObject };

    if (addToActivity) {
      inputObjectForUpdate["activity"] = arrayUnion({
        ...addToActivity,
        registeredAt: new Date(),
      });
    }
    await postNewDocument({
      collectionSelected: `workspaces/${workspaceId}/teams/${teamId}/issues`,
      documentName: issueId,
      noRegister: true,
      inputObject: inputObjectForUpdate,
    });
    return { error: false };
  } catch (e: any) {
    return { error: true, message: "Could not update the issue" };
  }
}
export async function getTeamIssues({
  callbackDocuments,
  teamId,
  workspaceId,
  valuesToIncludeInResult,
}: {
  valuesToIncludeInResult?: { [key: string]: any };
  workspaceId: string;
  teamId: string;
  callbackDocuments: (documents: {
    data?: any[];
    error: boolean;
    message?: string;
    unsub?: () => void;
    [key: string]: any;
  }) => void;
}) {
  try {
    // will gonna take all the issues
    getTeamIssuesFirebase({
      workspaceId,
      teamId,
      callbackDocuments,
      valuesToIncludeInResult,
    });
  } catch (e: any) {
    callbackDocuments({ error: true, message: e.message });
  }
}

export async function deleteIssue({
  issueObject,
  workspaceId,
  teamId,
  issueId,
}: {
  issueObject: any;
  workspaceId: string;
  teamId: string;
  issueId: string;
}) {
  try {
    await deleteLevelThreeNestedDocumentFirebase({
      firstCollectionName: "workspaces",
      firstDocumentName: workspaceId,
      secondCollectionName: "teams",
      secondDocumentName: teamId,
      thirdCollectionName: "issues",
      thirdDocumentName: issueId,
    });

    const updateTeamObjectInput: any = {
      issuesNumber: increment(1),
      //   membersId: { [creatorId]: { createdIssues: increment(-1),deletedIssues:increment(1) } },
      ...returnFitLabelsObject(issueObject, true),
    };
    if (issueObject?.creatorId != null) {
      // add to teammate history
      updateTeamObjectInput["membersId"] = {
        [issueObject.creatorId]: { deletedIssues: increment(1) },
      };
    }

    await postNewDocument({
      collectionSelected: `workspaces/${workspaceId}/teams`,
      documentName: teamId,
      inputObject: { issuesNumber: increment(-1) },
      noRegister: true,
    });
    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function postIssue({
  creatorId,
  newIssue,
  teamId,
  workspaceId,
}: {
  creatorId: string;
  workspaceId: string;
  teamId: string;
  newIssue: Issue;
}) {
  const batch = writeBatch(db);

  const teamDocument: any = await getOneTeam(workspaceId, teamId);

  // first get the team by id and workspace id , then take the number of issues
  if (teamDocument.error)
    return { error: true, message: "Could not find team" };
  try {
    // post issue
    const newIssueNumberIndentifier = teamDocument.data.issuesNumber + 1;
    const postedIssue = await postNewDocument({
      collectionSelected: `workspaces/${workspaceId}/teams/${teamId}/issues`,
      useAddDocument: true,
      inputObject: {
        ...newIssue,

        identifiedNumber: newIssueNumberIndentifier,
        // identified:
        //   teamDocument.data.identified + "-" + newIssueNumberIndentifier,
        updatedAt: serverTimestamp(),
        activity: [
          {
            creatorId: null,
            registerAt: new Date(),
            type: "created",
          },
        ],
      },
      useBatch: batch,
    });

    // increment issues number increment in membersIds the createdIssues by this member and to status , or/ and priority

    const updateTeamObjectInput = {
      issuesNumber: increment(1),
      membersId: { [creatorId]: { createdIssues: increment(1) } },
      ...returnFitLabelsObject(newIssue),
    };
    await postNewDocument({
      collectionSelected: `workspaces/${workspaceId}/teams`,
      documentName: teamId,
      inputObject: updateTeamObjectInput,
      noRegister: true,
      useBatch: batch,
    });

    await batch.commit();

    return { data: { id: postedIssue.id }, error: false };
  } catch (e: any) {
    return { error: true, message: "Could not post the issue" };
  }
}

export async function postIssueActivity({
  workspaceId,
  createdIssueId,
  teamId,
  creatorId,
  type,
  issueTypeIssue,
}: {
  issueTypeIssue: ActionTypeIssue | CommentTypeIssue | null;
  workspaceId: string;
  createdIssueId: string;
  teamId: string;
  type: string;
  creatorId: string | null;
}) {
  const activitesLink = `workspaces/${workspaceId}/teams/${teamId}/issues`;

  try {
    await postNewDocument({
      collectionSelected: activitesLink,
      documentName: createdIssueId,
      inputObject: {
        activity: arrayUnion({
          type, // can be action or comment
          creatorId, // if null then the app has created the issue
          [type]: issueTypeIssue,
          regiteredAt: serverTimestamp(),
        }),
      },
      noRegister: true,
    });
    return { data: true, error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function addPicturesURLToIssue({
  teamId,
  workspaceId,
  issueId,
  pictureListURL,
}: {
  pictureListURL: string[];
  workspaceId: string;
  teamId: string;
  issueId: string;
}) {
  try {
    await postNewDocument({
      collectionSelected: `workspaces/${workspaceId}/teams/${teamId}/issues`,
      documentName: issueId,
      inputObject: { content: { pictureListURL } },
    });
    return { data: true, error: false };
  } catch (e: any) {
    return { error: true, message: "Could add pictures url to  the issue" };
  }
}

export async function addIssuePicturesToStore({
  beforeGeneralPath,
  files,
}: {
  beforeGeneralPath: string;
  files: File[];
}) {
  try {
    return await postMultipleFiles({ beforeGeneralPath, files });
  } catch (e: any) {
    return { error: true, message: "Adding pictures to issue failed" };
  }
}
