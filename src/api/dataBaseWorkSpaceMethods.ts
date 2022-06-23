import { getWorkSpaceFirebase } from "../composables/firebase/workspace/useGetSelectedWorkspace";
import { postNewDocument } from "../composables/firebase/post/postDocument";
import { writeBatch, serverTimestamp } from "firebase/firestore";
import { createOneTeam } from "./dataBaseTeamsMethods";
import { tz } from "moment-timezone";

import { db } from "../firebase";

export async function getWorkSpace(workspaceId: string) {
  try {
    return await getWorkSpaceFirebase(workspaceId);
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function createNewWorkspace(
  workspaceName: string,
  userObject: any,
  batch?: any
) {
  try {
    const workspaceTrimed = workspaceName.trim();
    const browserDate = tz.guess(); //timezone
    const worspaceNameLowerCase = workspaceTrimed.toLocaleLowerCase();
    // workspaceURL , no  wierd characters
    const workspaceURL =
      worspaceNameLowerCase.indexOf(" ") !== -1
        ? worspaceNameLowerCase.split(" ").join("")
        : worspaceNameLowerCase;
    const createIdentified = workspaceURL.slice(0, 3).toUpperCase();

    if (batch) {
      const createdWorkSpace = await postNewDocument({
        collectionSelected: "workspaces",
        inputObject: {
          name: workspaceTrimed,
          photoURL: null,
          identified: createIdentified,
          labels: [
            { name: "Feature", icon: "labelFeature" },
            { name: "Improvement", icon: "labelImprovement" },
            { name: "Bug", icon: "labelBug" },
          ],
          timezone: browserDate,
          workspaceURL,
          membersId: {
            [userObject.uid]: { role: "Owner", invitedAt: serverTimestamp() },
          },
        },
        useAddDocument: true,
        useBatch: batch,
      });

      await postNewDocument({
        collectionSelected: "users",
        documentName: userObject.uid,
        inputObject: {
          workSpaces: { [createdWorkSpace.id]: { role: "Owner" } },
          workSpaceSelected: { id: createdWorkSpace.id }, // maybe add this one tes'}
        },
        noRegister: true,
        useBatch: batch,
      });

      return { error: false, data: createdWorkSpace };
    }

    const createdWorkSpace = await postNewDocument({
      collectionSelected: "workspaces",
      inputObject: {
        name: workspaceTrimed,
        photoURL: null,
        identified: createIdentified,
        labels: [
          { name: "Feature", icon: "labelFeature" },
          { name: "Improvement", icon: "labelImprovement" },
          { name: "Bug", icon: "labelBug" },
        ],
        timezone: browserDate,
        workspaceURL,
        membersId: {
          [userObject.uid]: { role: "Owner", invitedAt: serverTimestamp() },
        },
      },
      useAddDocument: true,
    });

    await postNewDocument({
      collectionSelected: "users",
      documentName: userObject.uid,
      inputObject: {
        workSpaces: { [createdWorkSpace.id]: { role: "Owner" } },
        workSpaceSelected: { id: createdWorkSpace.id }, // maybe add this one tes'}
      },
      noRegister: true,
    });

    return { error: false, data: createdWorkSpace };
  } catch (e: any) {
    return { error: false, message: e.message };
  }
}

export async function createNewWorkspaceWithTeam(
  workspaceName: string,
  userObject: any,
  teamName: string
) {
  try {
    const batch = writeBatch(db);

    const createdWorkspace = await createNewWorkspace(
      workspaceName,
      userObject,
      batch
    );
    const createdTeam = await createOneTeam(
      teamName,
      createdWorkspace.data,
      userObject,
      batch
    );

    await batch.commit();

    return {
      error: false,
      data: { workspace: createdWorkspace, team: createdTeam },
    };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function updateWorkspaceName({
  newName,
  workspaceId,
}: {
  workspaceId: string;
  newName: string;
}) {
  try {
    await postNewDocument({
      collectionSelected: "workspaces",
      documentName: workspaceId,
      inputObject: { name: newName },
      noRegister: true,
    });
    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function updateWorkspaceURL({
  newURL,
  workspaceId,
}: {
  workspaceId: string;
  newURL: string;
}) {
  try {
    await postNewDocument({
      collectionSelected: "workspaces",
      documentName: workspaceId,
      inputObject: { workspaceURL: newURL },
      noRegister: true,
    });
    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function getWorkSpacesByIds(workSpacesIds: {
  [key: string]: { role: string };
}) {
  try {
    const workspacesList: { [key: string]: any } = {};

    await Promise.all(
      Object.entries(workSpacesIds).map(async (workspace) => {
        const workspaceData = await getWorkSpaceFirebase(workspace[0]);
        if (!workspaceData.error && workspaceData.data) {
          workspacesList[workspaceData.data.id] = workspaceData.data;
        }
      })
    );

    return { data: workspacesList, error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function changeSelectedWorkspace(
  workSpaceId: string,
  userId: string
) {
  try {
    await postNewDocument({
      collectionSelected: "users",
      documentName: userId,
      inputObject: { workSpaceSelected: { id: workSpaceId } },
      noRegister: true,
    });

    return { data: true, error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}
