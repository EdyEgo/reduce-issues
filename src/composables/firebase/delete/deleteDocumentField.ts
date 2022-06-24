import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../firebase";

export async function deleteDocumentFieldFirebase({
  firstCollectionName,
  firstDocumentName,
  fieldToDelete,
  nestedFieldToDelete,
}: {
  firstCollectionName: string;
  firstDocumentName: string;
  nestedFieldToDelete: string;
  fieldToDelete: string;
}) {
  const documentRef = doc(db, firstCollectionName, firstDocumentName);

  await updateDoc(documentRef, {
    [`${fieldToDelete}.${nestedFieldToDelete}`]: deleteField(),
  });
}

export async function deleteLevelTwoNestedDocumentFieldFirebase({
  firstCollectionName,
  firstDocumentName,
  secondCollectionName,
  secondDocumentName,
  fieldToDelete,
  nestedFieldToDelete,
}: {
  firstCollectionName: string;
  firstDocumentName: string;
  secondCollectionName: string;
  secondDocumentName: string;

  fieldToDelete: string;
  nestedFieldToDelete: string;
}) {
  // if you wanna delete an issue :
  //workspaces/wokspaceName
  ///teams/teamName

  const documentRef = doc(
    db,
    firstCollectionName,
    firstDocumentName,
    secondCollectionName,
    secondDocumentName
  );

  await updateDoc(documentRef, {
    [`${fieldToDelete}.${nestedFieldToDelete}`]: deleteField(),
  });
}
