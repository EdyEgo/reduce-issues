// get users by ids 

import {getDocument} from '../get/getDocument'

export const getUsersFirebase = async (usersIds:string[])=>{
    const usersList:any = []

  await  Promise.all(
         usersIds.map(async (userId)=>{
            const userDocument =   await getDocument({collectionSelected:'users',documentName:userId})
            if(userDocument.exists()) usersList.push(userDocument.data())
         }) 
    
    ) 
    return usersList
}