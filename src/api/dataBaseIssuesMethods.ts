import { postNewDocument} from '../composables/firebase/post/postDocument' 
import {serverTimestamp} from 'firebase/firestore'
import type { Issue} from '../types/issues' 


export async function postIssue ({newIssue,teamId,workspaceId}:{workspaceId:string,teamId:string,newIssue:Issue}){
 try{
     const postedIssue = await postNewDocument({
         collectionSelected:`workspaces/${workspaceId}/teams/${teamId}/issues`,
         useAddDocument:true,
         inputObject:{...newIssue,updatedAt:serverTimestamp()},
        })
   return {data:{...postedIssue.data(),id:postedIssue.id},error:false}
 }catch(e:any){
 return {error:true,message:'Could not post the issue'}
 }
}

export async function addPicturesToIssue({teamId,workspaceId,issueId,pictureListURL}:{pictureListURL:string[],workspaceId:string,teamId:string,issueId:string}){
    try{
         await postNewDocument({
            collectionSelected:`workspaces/${workspaceId}/teams/${teamId}/issues/${issueId}`,
            
            inputObject:{content:{pictureListURL}},
           })
      return {data:true,error:false}
    }catch(e:any){
    return {error:true,message:'Could add pictures url to  the issue'}
    }
}