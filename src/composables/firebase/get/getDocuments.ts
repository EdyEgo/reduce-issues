import {
  onSnapshot,
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  orderBy,
  query,
  limit,
  startAt,
  DocumentSnapshot,
} from "firebase/firestore";

import { db } from "../../../firebase";

export const getAllDocumentsWithPagination = async ({
  itemsLimitedAt,
  path,
  orderByKey,
}: {
  path: string;
  orderByKey?: string;
  itemsLimitedAt: number;
}) => {
  // registeredAt
  const orderItemsBy = orderByKey ? orderByKey : "regiteredAt";

  let collectionRef: any = collection(db, path);

  // example in a team we must check if the user is in members so whereFilter will be "membersId.memberId"

  //                                        ex: "membersId.memberId" "in" ['Owner','Member']
  collectionRef = query(
    collectionRef,
    orderBy(orderItemsBy),
    limit(itemsLimitedAt)
  );
  const docSnap = await getDocs(collectionRef);

  return docSnap;
};

export const getDocumentsWithSubscription = ({
  path,
  valuesToIncludeInResult,
  callbackDocuments,
  orderByKey,
  wherePropertyKey,
  whereValues,
}: {
  callbackDocuments: (documents: {
    data?: any[];
    error: boolean;
    message?: string;
    unsub?: () => void;
    [key: string]: any;
  }) => void;
  wherePropertyKey?: string;
  whereValues?: string[];
  path: string;
  orderByKey?: string;
  valuesToIncludeInResult?: { [key: string]: any };
}) => {
  // later will add pagination
  let collectionRef: any = collection(db, path);
  const orderItemsBy = orderByKey ? orderByKey : "registeredAt";
  if (wherePropertyKey && whereValues)
    collectionRef = query(
      collectionRef,
      where(wherePropertyKey, "in", whereValues),
      orderBy(orderItemsBy)
    );
  if (wherePropertyKey == null && whereValues == null)
    collectionRef = query(collectionRef, orderBy(orderItemsBy));

  const unsub = onSnapshot(
    collectionRef,
    (snapshot: any) => {
      if (snapshot.empty) {
        if (valuesToIncludeInResult) {
          callbackDocuments({
            error: false,
            data: [],
            unsub,
            ...valuesToIncludeInResult,
          });
          return;
        }
        callbackDocuments({ error: false, data: [], unsub });
        return;
      }

      const documents = snapshot.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id, ref: doc.ref };
      });

      if (valuesToIncludeInResult) {
        callbackDocuments({
          error: false,
          data: documents,
          unsub,
          ...valuesToIncludeInResult,
        });
        return;
      }
      callbackDocuments({ error: false, data: documents, unsub });
    },
    (error) => {
      callbackDocuments({
        message: error.message,
        error: true,
        unsub,
        ...valuesToIncludeInResult,
      });
    }
  );
};

export const getDocumentsWithWhere = async ({
  path,
  wherePropertyKey,
  whereValues,
  orderByKey,
}: {
  wherePropertyKey: string;
  whereValues: string[];
  path: string;
  orderByKey?: string;
}) => {
  let collectionRef: any = collection(db, path);

  // example in a team we must check if the user is in members so whereFilter will be "membersId.memberId"
  if (orderByKey) {
    //                                        ex: "membersId.memberId.role" "in" ['Owner','Member']
    collectionRef = query(
      collectionRef,
      where(wherePropertyKey, "in", whereValues),
      orderBy(orderByKey)
    );
    const docSnap = await getDocs(collectionRef);

    return docSnap;
  }

  //where('membersId.KtTllXmMWzbi23F8EA0ivsSydtH2.role','in',['Owner','Member','TeamLeader'])
  collectionRef = query(
    collectionRef,
    where(wherePropertyKey, "in", whereValues)
  );
  const docSnap = await getDocs(collectionRef);

  return docSnap;
};

export const getDocument = async ({
  collectionName,
  documentName,
}: {
  collectionName: string;
  documentName: string;
}) => {
  const docRef = doc(db, collectionName, documentName);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const getDocumentFromNestedCollection = async ({
  firstCollectionName,
  firstDocumentsName,
  secondCollectionName,
  secondDocumentName,
}: {
  firstCollectionName: string;
  firstDocumentsName: string;
  secondCollectionName: string;
  secondDocumentName: string;
}) => {
  const docRef = doc(
    db,
    firstCollectionName,
    firstDocumentsName,
    secondCollectionName,
    secondDocumentName
  );
  // you ca also use the spred operator ...arguments/params in doc ,
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const getDocuments = async ({
  path,
  queryPath,
  orderByKey,
  limit,
}: {
  path: string;
  orderByKey?: string;
  queryPath?: string;
  limit?: number;
}) => {
  let collectionRef: any = collection(db, path);
  if (orderByKey) {
    collectionRef = query(collectionRef, orderBy(orderByKey));
  }

  const docSnap = await getDocs(collectionRef);

  return docSnap;
};
