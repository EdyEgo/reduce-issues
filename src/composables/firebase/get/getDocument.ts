import {
  doc,
  getDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const getDocument = async ({
  collectionSelected,

  documentName,
}: {
  collectionSelected: string;
  documentName: string;
}) => {
  const docRef = doc(db, collectionSelected, documentName);
  const docSnap = await getDoc(docRef);

  return docSnap;
};

export async function getDocumentWithQuery({
  collectionSelected,
  queryKeyName, // query key name and query value must be in double quotes
  documentQuery,
}: {
  collectionSelected: string;
  queryKeyName: string;
  documentQuery: string;
}) {
  const documentRef = collection(db, collectionSelected);

  const queryRef = query(documentRef, where(queryKeyName, "==", documentQuery));
  // ex : queryKeyName["email"] and documentQuery["your.email@gmail.com"]
  const querySnapshot = await getDocs(queryRef);

  const extractedDocuments: any = [];
  querySnapshot.forEach((doc) =>
    extractedDocuments.push({ ...doc.data(), id: doc.id })
  );
  return extractedDocuments;
}
