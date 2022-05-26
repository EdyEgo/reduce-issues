import { postNewDocument} from '../composables/firebase/post/postDocument' 
import {postMultipleFiles} from './dataBaseStorageMethods'
import {serverTimestamp} from 'firebase/firestore'
import type { Issue} from '../types/issues' 

interface ActionTypeIssue{
    iconType:string,//can be userAvatar or any other icon
    actionMessage:string,// changed status , self-assigned etc
    fromMessage:string | null, 
    toMessage:string | null;
}

interface CommentTypeIssue{
    picturesURL:string[] | null,text:string
}

export async function postIssue ({newIssue,teamId,workspaceId}:{workspaceId:string,teamId:string,newIssue:Issue}){
 try{
     const postedIssue = await postNewDocument({
         collectionSelected:`workspaces/${workspaceId}/teams/${teamId}/issues`,
         useAddDocument:true,
         inputObject:{...newIssue,updatedAt:serverTimestamp()},
        })
    
   return {data:{id:postedIssue.id},error:false}
 }catch(e:any){
    
 return {error:true,message:'Could not post the issue'}
 }
}

export async function postIssueActivity({workspaceId,createdIssueId,teamId,creatorId,type,issueTypeIssue}:{issueTypeIssue:ActionTypeIssue | CommentTypeIssue |  null,workspaceId:string,createdIssueId:string,teamId:string,type:string,creatorId:string | null}){
   
  const activitesLink = `workspaces/${workspaceId}/teams/${teamId}/issues`

try{
    await postNewDocument({collectionSelected:activitesLink,documentName:createdIssueId,
        inputObject:{
            type,// can be action or comment
            creatorId,// if null then the app has created the issue
            [type]:issueTypeIssue
    
        }
      })
      return {data:true,error:false}
}catch(e:any){
 return {error:true,message:e.message}
}

 
  
}

export async function addPicturesURLToIssue({teamId,workspaceId,issueId,pictureListURL}:{pictureListURL:string[],workspaceId:string,teamId:string,issueId:string}){
    try{
      
         await postNewDocument({
            collectionSelected:`workspaces/${workspaceId}/teams/${teamId}/issues`,
            documentName:issueId,
            inputObject:{content:{pictureListURL}},
           })
      return {data:true,error:false}
    }catch(e:any){
    return {error:true,message:'Could add pictures url to  the issue'}
    }


}


export async function addIssuePicturesToStore({beforeGeneralPath,files}:{beforeGeneralPath:string,files:File[]}){
    try{
        return await postMultipleFiles({beforeGeneralPath,files})
    }catch(e:any){
        return {error:true,message:'Adding pictures to issue failed'}
    }
}