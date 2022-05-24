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
        let downloadListObjects:any = []
       const result  = await   Promise.all(
            files.map(async (file)=>{
               const document:any = await postToStorageFirebase({file,path:beforeGeneralPath + file.name})
               //fileResult.data.snapshot, fileResult.data.downloadURL 
               if(document.error) return
               downloadListObjects.push({snapshot:document.data.snapshot,downloadURL:document.data.downloadURL})
            })
        )
        // wich one will you keep ??
        return {data:{result,files:downloadListObjects},error:false}
    }catch(e:any){
      return {error:true,message:e.message}
    }

}