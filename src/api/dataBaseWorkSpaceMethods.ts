import {getWorkSpaceFirebase} from '../composables/firebase/workspace/useGetSelectedWorkspace'

export async function getWorkSpace(workspaceId:string){
   
        try{
            return await getWorkSpaceFirebase(workspaceId)
        }catch(e:any){
          return {error:true,message:e.message}
        }
  
}