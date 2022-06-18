import {  addDoc, collection, doc, serverTimestamp, setDoc   } from 'firebase/firestore';


import {db} from '../../../firebase'

// batch does not have merge , and you can only use add document as an option or use batch but not both 

const postDocument = async ({
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

export const postNewNestedDocument = async ({
 
 inputObject,
noRegister,useBatch ,firstCollectionName,firstDocumentName,secondCollectionName,secondDocumentName
}: {

 
 noRegister?:boolean;
 inputObject: any;useBatch?:any | undefined;
 firstCollectionName:string;firstDocumentName:string;secondCollectionName:string;secondDocumentName:string
}) => {
 let copyObjectInput:any
 if(noRegister == null) copyObjectInput = { ...inputObject, ...{ registeredAt: serverTimestamp() } };
 if(noRegister)copyObjectInput = {...inputObject}






 const documentRef = doc(db, firstCollectionName, firstDocumentName,secondCollectionName,secondDocumentName) 

 //
     if(useBatch) {
       const newDocumentObject = useBatch.set(documentRef, copyObjectInput)
       return newDocumentObject
     }
 //
 const resultPostedDoument = await setDoc(documentRef, copyObjectInput);

 return resultPostedDoument;
 


    } 



    export const postNewNestedDocumentNoDocumentName = async ({
 
      inputObject,useAddDoc,
     noRegister,useBatch ,firstCollectionName,firstDocumentName,secondCollectionName
     }: {
     useAddDoc?:boolean,
      
      noRegister?:boolean;
      inputObject: any;useBatch?:any | undefined;
      firstCollectionName:string;firstDocumentName:string;secondCollectionName:string
     }) => {
      let copyObjectInput:any
      if(noRegister == null) copyObjectInput = { ...inputObject, ...{ registeredAt: serverTimestamp() } };
      if(noRegister)copyObjectInput = {...inputObject}
     
     
     
     
     
     
      const documentRef = doc(collection(db, firstCollectionName, firstDocumentName,secondCollectionName)) 
     
      //
          if(useBatch) {
            const newDocumentObject = useBatch.set(documentRef, copyObjectInput,{merge:true})
            return newDocumentObject
          }
      //

      if(useAddDoc){

        const resultPostedDoument = await addDoc(collection(db, firstCollectionName, firstDocumentName,secondCollectionName), copyObjectInput);
     
        return resultPostedDoument;
      }
      const resultPostedDoument = await setDoc(documentRef, copyObjectInput,{merge:true});
     
      return resultPostedDoument;
      
     
     
         }



         export const postNewNestedLevelTwoDocumentNoDocumentName = async ({
 
          inputObject,useAddDoc,
         noRegister,useBatch ,firstCollectionName,firstDocumentName,secondCollectionName,
         secondDocumentName,thirdCollectionName
         }: {
         useAddDoc?:boolean,
          
          noRegister?:boolean;
          inputObject: any;useBatch?:any | undefined;
          firstCollectionName:string;firstDocumentName:string;secondCollectionName:string;
          secondDocumentName:string,thirdCollectionName:string
         }) => {
          let copyObjectInput:any
          if(noRegister == null) copyObjectInput = { ...inputObject, ...{ registeredAt: serverTimestamp() } };
          if(noRegister)copyObjectInput = {...inputObject}
         
         
         
         
         
         

          //
    
          if(useAddDoc){
            const collectionRef = collection(db, firstCollectionName, firstDocumentName,secondCollectionName,secondDocumentName,thirdCollectionName)
           
            const resultPostedDoument = await addDoc(collectionRef, copyObjectInput);
         
            return resultPostedDoument;
          }


          const documentRef = doc(collection(db, firstCollectionName, firstDocumentName,secondCollectionName,secondDocumentName,thirdCollectionName)) 
         
          //
              if(useBatch) {
                const newDocumentObject = useBatch.set(documentRef, copyObjectInput)
                return newDocumentObject
              }
          const resultPostedDoument = await setDoc(documentRef, copyObjectInput);
         
          return resultPostedDoument;
          
         
         
             }