import {} from "../composables/firebase/teams/getUsersTeamMemebers";
import { getTeamIssues, deleteIssue } from "./dataBaseIssuesMethods";
import {
  getTeamsFirebase,
  getTeamsFirebaseWithWhere,
  getOneTeamFirebase,
} from "../composables/firebase/teams/getWorkspaceTeams";
import { postNewDocument } from "../composables/firebase/post/postDocument";
import { deleteLevelTwoNestedDocumentFieldFirebase } from "../composables/firebase/delete/deleteDocumentField";
import {
  deleteLevelTwoNestedDocumentFirebase,
  deleteDocumentWithRefAsId,
} from "../composables/firebase/delete/deleteDocument";
import { serverTimestamp } from "firebase/firestore";
import { tz } from "moment-timezone";

export async function deleteOneTeamWithIssues({
  teamId,

  workspaceId,
}: {
  workspaceId: string;

  teamId: string;
}) {
  try {
    await deleteLevelTwoNestedDocumentFirebase({
      firstCollectionName: "workspaces",
      firstDocumentName: workspaceId,
      secondCollectionName: "teams",
      secondDocumentName: teamId,
    });
    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function deleteOneTeam({
  teamId,
  issuesWithRefs,
  workspaceId,
}: {
  workspaceId: string;
  issuesWithRefs: any;
  teamId: string;
}) {
  try {
    await deleteLevelTwoNestedDocumentFirebase({
      firstCollectionName: "workspaces",
      firstDocumentName: workspaceId,
      secondCollectionName: "teams",
      secondDocumentName: teamId,
    });

    await Promise.all(
      issuesWithRefs.map(async (issue: { ref: any }) => {
        // await deleteLevelThreeNestedDocumentFirebase({
        //   firstCollectionName:"workspaces",firstDocumentName:workspaceId,
        //   secondCollectionName:"teams",secondDocumentName:teamId,
        //   thirdCollectionName:"issues",thirdDocumentName:
        // })
        await deleteDocumentWithRefAsId(issue.ref);
      })
    );

    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function deleteOneTeamMember({
  memberIdFiledToDelete,
  teamId,
  workspaceId,
}: {
  memberIdFiledToDelete: string;

  workspaceId: string;
  teamId: string;
}) {
  try {
    // const

    await deleteLevelTwoNestedDocumentFieldFirebase({
      fieldToDelete: "membersId",
      nestedFieldToDelete: memberIdFiledToDelete,
      firstCollectionName: "workspaces",
      firstDocumentName: workspaceId,
      secondCollectionName: "teams",
      secondDocumentName: teamId,
    });
    console.group(workspaceId, memberIdFiledToDelete, teamId);

    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function updateOneteam({
  inputObject,
  teamId,
  workspaceId,
}: {
  inputObject: any;
  workspaceId: string;
  teamId: string;
}) {
  try {
    await postNewDocument({
      collectionSelected: `workspaces/${workspaceId}/teams`,
      documentName: teamId,
      noRegister: true,
      inputObject,
    });

    return { error: false };
  } catch (e: any) {
    return { error: true, message: "Could not update the team" };
  }
}

export async function createOneTeam(
  teamName: string,
  workspace: { id: string },
  userObject: any,
  identified?: string | null,
  batch?: any
) {
  try {
    const teamNameTrimed = teamName.trim();
    const browserDate = tz.guess(); //timezone
    const teamNameLowerCase = teamNameTrimed.toLocaleLowerCase();
    // workspaceURL , no  wierd characters
    const teamURL =
      teamNameLowerCase.indexOf(" ") !== -1
        ? teamNameLowerCase.split(" ").join("")
        : teamNameLowerCase;
    const createIdentified = identified
      ? identified
      : teamURL.slice(0, 3).toUpperCase();

    if (batch) {
      const createdTeam = await postNewDocument({
        collectionSelected: `workspaces/${workspace.id}/teams`,
        inputObject: {
          issuesNumber: 1,
          membersId: {
            [userObject.uid]: { role: "Owner", invitedAt: serverTimestamp() },
          },

          name: teamNameTrimed,
          teamURL,
          photoURL: null,
          identified: createIdentified,
          timezone: browserDate,
        },
        useAddDocument: true,
        useBatch: batch,
      });

      return { error: false, data: createdTeam };
    }
    const teamObject = {
      issuesNumber: 1,
      membersId: {
        [userObject.uid]: { role: "Owner", invitedAt: serverTimestamp() },
      },

      name: teamNameTrimed,
      teamURL,
      photoURL: null,
      identified: createIdentified,
      timezone: browserDate,
    };
    const createdTeam = await postNewDocument({
      collectionSelected: `workspaces/${workspace.id}/teams`,
      inputObject: teamObject,
      useAddDocument: true,
    });

    return { error: false, data: createdTeam, teamObject };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function getOneTeam(workspaceId: string, teamId: string) {
  try {
    return await getOneTeamFirebase(workspaceId, teamId);
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function getTeams(workspaceId: string) {
  try {
    return await getTeamsFirebase(workspaceId);
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function getTeamsWhereTheUserMeetsTheRole(
  workspaceId: string,
  memberId: string,
  userIsWorspaceOnwner: boolean
) {
  const userRoles = userIsWorspaceOnwner ? ["Member", "Owner"] : ["Member"];
  // if the user is the owner of the workspace he can see all the teams even if he/she is not a member of those teams
  try {
    return await getTeamsFirebaseWithWhere(
      workspaceId,
      `membersId.${memberId}.role`,
      userRoles
    );
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}
