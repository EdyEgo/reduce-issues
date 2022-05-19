// get user by id 
import {getDocument} from '../get/getDocument'

export const getUserFirebase = async (userId:string)=>{
    return await getDocument({collectionSelected:'users',documentName:userId})
}