import { doc, deleteDoc } from "firebase/firestore";
import {db} from '../../../firebase'

export async function deleteLevelThreeNestedDocumentFirebase({
    firstCollectionName,firstDocumentName,
    secondCollectionName,secondDocumentName,
    thirdCollectionName,thirdDocumentName
}:{
    firstCollectionName:string,firstDocumentName:string,
    secondCollectionName:string,secondDocumentName:string,
    thirdCollectionName:string,thirdDocumentName:string,

}){
// if you wanna delete an issue :
//workspaces/wokspaceName
///teams/teamName
///issues/issueName

const documentRef =  doc(db,firstCollectionName,firstDocumentName,
    secondCollectionName,secondDocumentName,thirdCollectionName,thirdDocumentName);

    await deleteDoc(documentRef)


    



}


//////// ex if you wanna delete a field --->
// import { doc, updateDoc, deleteField } from "firebase/firestore";

// const cityRef = doc(db, 'cities', 'BJ');

// // Remove the 'capital' field from the document
// await updateDoc(cityRef, {
//     capital: deleteField()
// });
/////////// <------