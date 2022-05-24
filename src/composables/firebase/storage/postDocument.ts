import {  ref ,uploadBytes,uploadBytesResumable , getDownloadURL} from "firebase/storage"
import {storage} from '../../../firebase'




export const postToStorageFirebase = async ({file,path}:{file:File,path:string})=>{
    try{
        const fileRef = ref(storage,path)
        const snapshot = await uploadBytes(fileRef,file)
        const downloadURL = await getDownloadURL(snapshot.ref)
        return {data:{snapshot,downloadURL},error:false}
    }catch(e){
        return{error:true,message:'Could not upload file'}
    }
}