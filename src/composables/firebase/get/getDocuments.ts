import {  collection,getDocs,getDoc,doc,where,orderBy , query ,limit , startAt , } from 'firebase/firestore';

import {db} from '../../../firebase'


export const getDocumentsWithWhere = async ({path,wherePropertyKey,whereValues,orderByKey}:{wherePropertyKey:string,whereValues:string[],path:string, orderByKey?:string})=>{
     
  let  collectionRef:any = collection(db,path)
  
  // example in a team we must check if the user is in members so whereFilter will be "membersId.memberId"
  if(orderByKey){
    collectionRef = query(collectionRef, where(wherePropertyKey,'in',whereValues), orderBy(orderByKey));
    const docSnap = await getDocs(collectionRef);
  
   
    return docSnap

  }



 
 
//where('membersId.KtTllXmMWzbi23F8EA0ivsSydtH2.role','in',['Owner','Member','TeamLeader'])
    collectionRef = query(collectionRef, where(wherePropertyKey,'in',whereValues));
    const docSnap = await getDocs(collectionRef);
  
   
    return docSnap
 
}

export const getDocument = async ({collectionName, documentName}:{collectionName:string,documentName:string})=>{
  const docRef = doc(db,collectionName,documentName);
const docSnap = await getDoc(docRef);
return docSnap
}

export const getDocuments = async ({
   path , queryPath , orderByKey ,limit
  }: {
    path:string
    orderByKey?:string
    queryPath?:string
    limit?:number
  }) => {
  
  

  let  collectionRef:any = collection(db,path)
  if(orderByKey){
    collectionRef = query(collectionRef, orderBy(orderByKey));
  }
 
  const docSnap = await getDocs(collectionRef);
  
   
    return docSnap
  
  };

