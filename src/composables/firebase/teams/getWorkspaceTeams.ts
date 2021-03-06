import {
  getDocuments,
  getDocumentsWithWhere,
  getDocumentFromNestedCollection,
} from "../get/getDocuments";

export async function getOneTeamFirebase(workspaceId: string, teamId: string) {
  try {
    const document = await getDocumentFromNestedCollection({
      firstCollectionName: "workspaces",
      firstDocumentsName: workspaceId,
      secondCollectionName: "teams",
      secondDocumentName: teamId,
    });
    return { data: { ...document.data(), id: document.id }, error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function getTeamsFirebase(workspaceId: string) {
  try {
    const workspaceTeamPath = `workspaces/${workspaceId}/teams`;
    const teamsDocs = await getDocuments({ path: workspaceTeamPath }); // ,orderByKey:'registeredAt'
    if (teamsDocs.empty) return { data: [], error: false };
    const teamDocuments: any = [];
    teamsDocs.forEach((teamDoc: any) => {
      //{data:()=>any,id:string}
      teamDocuments.push({
        ...teamDoc.data(),
        id: teamDoc.id,
        teamRef: teamDoc.ref,
        workspaceId,
      });
    });

    return { data: teamDocuments, error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function getTeamsFirebaseWithWhere(
  workspaceId: string,
  wherePropertyKey: string,
  whereValues: string[]
) {
  try {
    const workspaceTeamPath = `workspaces/${workspaceId}/teams`;
    const teamsDocs = await getDocumentsWithWhere({
      path: workspaceTeamPath,
      wherePropertyKey,
      whereValues,
    });
    if (teamsDocs.empty) return { data: [], error: false };
    const teamDocuments: any = [];
    teamsDocs.forEach((teamDoc: { data: () => any; id: string; ref: any }) => {
      teamDocuments.push({
        ...teamDoc.data(),
        id: teamDoc.id,
        teamRef: teamDoc.ref,
        workspaceId,
      });
    });

    return { data: teamDocuments, error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}
