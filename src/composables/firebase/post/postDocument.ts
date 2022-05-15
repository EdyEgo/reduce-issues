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
  documentName,noRegister
}: {
  collectionSelected: string;
  useAddDocument?:boolean;
  documentName?: string;noRegister?:boolean;
  inputObject: any;
}) => {
  let copyObjectInput:any
  if(noRegister == null) copyObjectInput = { ...inputObject, ...{ registeredAt: Date.now() } };
  if(noRegister)copyObjectInput = {...inputObject}

  if(useAddDocument){

    const newDocumentObject = await addDoc(collection(db, collectionSelected), copyObjectInput);
    return  newDocumentObject
  }


  if(documentName == null) { // create a document with a random id
    // const result_for_posted_doument = await addDoc(doc(db, collection_selected), copy_object_input)
    const resultPostedDoument = doc(collection(db, collectionSelected));
    const newDocumentObject = await setDoc(resultPostedDoument, copyObjectInput);
console.log('new created document is 1',newDocumentObject)
  return newDocumentObject
  }
  const resultPostedDoument = await setDoc(doc(db, collectionSelected, documentName), copyObjectInput,{merge:true});
  console.log('new created document is 2',resultPostedDoument)
  return resultPostedDoument;

};
 


