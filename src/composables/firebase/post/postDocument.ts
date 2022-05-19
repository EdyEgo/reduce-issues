import {  addDoc, collection, doc, serverTimestamp, setDoc  } from 'firebase/firestore';


import {db} from '../../../firebase'

export const postDocument = async ({
    collectionSelected,
  inputObject,
}: {
    collectionSelected: string;
  inputObject: any;
}) => {
  // collection_selected can look like so "CollectionName/DocumentName/CollectionName"
  const copy_inputObject = { ...inputObject };
  if (copy_inputObject.regiteredAt != null) copy_inputObject.regiteredAt = serverTimestamp();
  const collRef = collection(db, collectionSelected);
  const updated_document = await addDoc(collRef, inputObject);
  return updated_document;
};
 

    

export const postNewDocument = async ({
   collectionSelected,
  inputObject,useAddDocument,
  documentName,noRegister,useBatch
}: {
  collectionSelected: string;
  useAddDocument?:boolean;// remember  the setDoc does not return the document object only the addDoc
  documentName?: string;noRegister?:boolean;
  inputObject: any;useBatch?:any | undefined
}) => {
  let copyObjectInput:any
  if(noRegister == null) copyObjectInput = { ...inputObject, ...{ registeredAt: serverTimestamp() } };
  if(noRegister)copyObjectInput = {...inputObject}

  if(useAddDocument){

    const newDocumentObject = await addDoc(collection(db, collectionSelected), copyObjectInput);
    return  newDocumentObject
  }


  if(documentName == null) { // create a document with a random id
    // const result_for_posted_doument = await addDoc(doc(db, collection_selected), copy_object_input)

    const documentRef = doc(collection(db, collectionSelected));
    //
    if(useBatch) {
      const newDocumentObject = useBatch.set(documentRef, copyObjectInput)
      return newDocumentObject
    }
    //
    const newDocumentObject = await setDoc(documentRef, copyObjectInput);

  return newDocumentObject
  }

  const documentRef = doc(db, collectionSelected, documentName) 
  //
      if(useBatch) {
        const newDocumentObject = useBatch.set(documentRef, copyObjectInput,{merge:true})
        return newDocumentObject
      }
  //
  const resultPostedDoument = await setDoc(documentRef, copyObjectInput,{merge:true});
 
  return resultPostedDoument;

};
 


