import {  doc, getDoc } from 'firebase/firestore';
import {db} from '../../../firebase'

export const getDocument = async ({
    collectionSelected,
  
    documentName
  }: {
    collectionSelected: string;
    documentName: string
  
  }) => {
  
    
  const docRef = doc(db, collectionSelected, documentName);
  const docSnap = await getDoc(docRef);
  
   
    return docSnap
  
  };