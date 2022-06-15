import {} from '../composables/firebase/teams/getUsersTeamMemebers'
import {getTeamsFirebase,getTeamsFirebaseWithWhere,getOneTeamFirebase} from '../composables/firebase/teams/getWorkspaceTeams'
import {postNewDocument} from '../composables/firebase/post/postDocument'
import { serverTimestamp} from 'firebase/firestore'
import { tz} from 'moment-timezone'


export async function createOneTeam(teamName:string,workspace:{id:string},userObject:any,batch?:any){
   try{ 
 
    const teamNameTrimed = teamName.trim()
    const browserDate = tz.guess()//timezone
    const teamNameLowerCase  = teamNameTrimed.toLocaleLowerCase()
    // workspaceURL , no  wierd characters 
    const teamURL = teamNameLowerCase.indexOf(' ') !== -1 ? teamNameLowerCase.split(' ').join('') : teamNameLowerCase
    const createIdentified = teamURL.slice(0,3).toUpperCase()

    if(batch){

      const createdTeam =  await postNewDocument({collectionSelected:`workspaces/${workspace.id}/teams`,
      inputObject:{issuesNumber:1,membersId:{[userObject.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
    
      name: teamNameTrimed,teamURL,photoURL:null,identified:createIdentified , timezone:browserDate
    }
      ,useAddDocument:true,useBatch:batch}) 


   
      return {error:false,data:createdTeam}
      
    }

    const createdTeam =  await postNewDocument({collectionSelected:`workspaces/${workspace.id}/teams`,
      inputObject:{issuesNumber:1,membersId:{[userObject.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
    
      name: teamNameTrimed,teamURL,photoURL:null,identified:createIdentified , timezone:browserDate
    }
      ,useAddDocument:true}) 

      return {error:false,data:createdTeam}
   }catch(e:any){
      return {error:true,message:e.message}
   }
}

export async function getOneTeam(workspaceId:string,teamId:string){
  try{
    return await getOneTeamFirebase(workspaceId,teamId)
  }catch(e:any){
    return {error:true,message:e.message}
  }
}

export async function getTeams(workspaceId: string){
   

    try{
        return await getTeamsFirebase(workspaceId)
    }catch(e:any){
      return {error:true,message:e.message}
    }
}

export async function getTeamsWhereTheUserMeetsTheRole(workspaceId: string,memberId:string,userIsWorspaceOnwner:boolean){
     const userRoles = userIsWorspaceOnwner ? ['Member','Owner'] : ['Member']
     // if the user is the owner of the workspace he can see all the teams even if he/she is not a member of those teams
    try{
        return await getTeamsFirebaseWithWhere(workspaceId,`membersId.${memberId}.role`,userRoles)
    }catch(e:any){
      return {error:true,message:e.message}
    }
}