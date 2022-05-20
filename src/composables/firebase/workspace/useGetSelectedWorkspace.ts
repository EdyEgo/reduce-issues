import {getDocument} from '../get/getDocument'

export const getWorkSpaceFirebase = async (workspaceId:string)=>{ 
    try{
       const document = await getDocument({collectionSelected:'workspaces',documentName:workspaceId})
       if(!document.exists()) return{error:true,message:'Workspace does not exists'}
       return {data:document.data(),error:false }
    }catch(e){
        return{error:true,message:'Workspace does not exists'}
    } 


   
  
}