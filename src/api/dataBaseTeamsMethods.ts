import {} from '../composables/firebase/teams/getUsersTeamMemebers'
import {getTeamsFirebase,getTeamsFirebaseWithWhere,getOneTeamFirebase} from '../composables/firebase/teams/getWorkspaceTeams'


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