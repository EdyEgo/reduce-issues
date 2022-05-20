import {} from '../composables/firebase/teams/getUsersTeamMemebers'
import {getTeamsFirebase} from '../composables/firebase/teams/getWorkspaceTeams'


export async function getTeams(workspaceId: string){
   

    try{
        return await getTeamsFirebase(workspaceId)
    }catch(e:any){
      return {error:true,message:e.message}
    }
}