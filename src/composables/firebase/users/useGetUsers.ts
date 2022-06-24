// get users by ids

import { getDocument, getDocumentWithQuery } from "../get/getDocument";

export async function getUserByEmailFirebase({
  userEmail,
}: {
  userEmail: string;
}) {
  return await getDocumentWithQuery({
    collectionSelected: "users",
    queryKeyName: "email",
    documentQuery: userEmail,
  });
}

export const getUsersFirebase = async (
  usersIds: string[] | { [key: string]: any }
) => {
  const usersList: any = [];

  if (Array.isArray(usersIds)) {
    await Promise.all(
      usersIds.map(async (userId) => {
        const userDocument = await getDocument({
          collectionSelected: "users",
          documentName: userId,
        });
        if (userDocument.exists())
          usersList.push({ ...userDocument.data(), id: userId });
      })
    );
    return usersList;
  }

  await Promise.all(
    Object.entries(usersIds).map(async (user) => {
      const userDocument = await getDocument({
        collectionSelected: "users",
        documentName: user[0],
      });
      if (userDocument.exists())
        usersList.push({ ...userDocument.data(), id: user[0] });
    })
  );

  return usersList;
};
