import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../firebase";

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
