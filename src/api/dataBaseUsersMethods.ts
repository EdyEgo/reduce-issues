import { getUserFirebase } from "../composables/firebase/users/useGetUser";
import { postNewDocument } from "../composables/firebase/post/postDocument";
import {
  getUsersFirebase,
  getUserByEmailFirebase,
} from "../composables/firebase/users/useGetUsers";
import { deleteDocumentFieldFirebase } from "../composables/firebase/delete/deleteDocumentField";

export const getUser = async ({ userId }: { userId: string }) => {
  return await getUserFirebase(userId);
};

export const getUsers = async ({
  usersIds,
}: {
  usersIds: string[] | { [key: string]: any };
}) => {
  try {
    const usersDoc = await getUsersFirebase(usersIds);
    return { data: usersDoc, error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
};

export async function getUserByEmail(userEmail: string) {
  try {
    const listUsers = await getUserByEmailFirebase({ userEmail });
    return { error: false, data: listUsers };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function addWorkspaceToUserWorkSpaces({
  role,
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
  role: string;
}) {
  try {
    await postNewDocument({
      collectionSelected: "users",
      documentName: userId,
      noRegister: true,
      inputObject: {
        workSpaces: {
          [workspaceId]: {
            role,
          },
        },
      },
    });
    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function removeWorkspaceFromUserWorkspaces({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) {
  try {
    await deleteDocumentFieldFirebase({
      firstCollectionName: "users",
      firstDocumentName: userId,
      fieldToDelete: "workSpaces",
      nestedFieldToDelete: workspaceId,
    });
  } catch (e: any) {}
}
