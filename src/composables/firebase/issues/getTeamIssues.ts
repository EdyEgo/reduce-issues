import {getDocumentsWithSubscription} from '../get/getDocuments' 

export const getTeamIssuesFirebase =  ({workspaceId,teamId,callbackDocuments,valuesToIncludeInResult}:{valuesToIncludeInResult?:{[key:string]:any},workspaceId:string,teamId:string,callbackDocuments:(documents:{data?:any[],error:boolean,message?:string,unsub?:()=>void,[key:string]:any})=>void})=>{
    try{
        getDocumentsWithSubscription({path:`workspaces/${workspaceId}/teams/${teamId}/issues`,
        callbackDocuments,orderByKey:"registeredAt",valuesToIncludeInResult})
    }catch(e:any){
        callbackDocuments({error:true,message:e.message})
    }
}