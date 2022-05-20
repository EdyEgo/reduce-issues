import {  collection,getDocs,where,orderBy , query ,limit , startAt} from 'firebase/firestore';

import {db} from '../../../firebase'

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