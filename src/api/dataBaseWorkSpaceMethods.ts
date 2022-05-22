import {getWorkSpaceFirebase} from '../composables/firebase/workspace/useGetSelectedWorkspace'

export async function getWorkSpace(workspaceId:string){
   
        try{
            return await getWorkSpaceFirebase(workspaceId)
        }catch(e:any){
          return {error:true,message:e.message}
        }
  
}

export async function getWorkSpacesByIds(workSpacesIds:{[key:string]:{role:string}}){
      try{
      
       const workspacesList:{[key:string]:any} = {}
      
      await Promise.all( 
        Object.entries(workSpacesIds).map(async(workspace)=>{
    
           const workspaceData =  await getWorkSpaceFirebase(workspace[0])
           if(!workspaceData.error && workspaceData.data){
             workspacesList[workspaceData.data.id] = workspaceData.data
           }
        })
      ) 
      
      return {data:workspacesList,error:false}
   
    }catch(e:any){
      return {error:true,message:e.message}
    }
}