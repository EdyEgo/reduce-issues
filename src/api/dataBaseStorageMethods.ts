import { postToStorageFirebase} from '../composables/firebase/storage/postDocument'

export async function postFile({file,path}:{file:File,path:string}){
    try{
        return await postToStorageFirebase({file,path})
    }catch(e:any){
      return {error:true,message:e.message}
    }
}

export async function postMultipleFiles({beforeGeneralPath,files}:{files:File[],beforeGeneralPath:string}){
    try{
       const result  = await   Promise.all(
            files.map(async (file)=>{
                await postToStorageFirebase({file,path:beforeGeneralPath + file.name})
            })
        )
        return {data:result,error:false}
    }catch(e:any){
      return {error:true,message:e.message}
    }

}