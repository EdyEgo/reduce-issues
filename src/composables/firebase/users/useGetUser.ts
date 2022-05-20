// get user by id 
import {getDocument} from '../get/getDocument'

export const getUserFirebase = async (userId:string)=>{
    // return await getDocument({collectionSelected:'users',documentName:userId}) 

    try{
        const document = await getDocument({collectionSelected:'users',documentName:userId}) 
        if(!document.exists()) return{error:true,message:'User does not exists'}
        return {data:document.data(),error:false}
     }catch(e){
         return{error:true,message:'Could not get user'}
     }
}