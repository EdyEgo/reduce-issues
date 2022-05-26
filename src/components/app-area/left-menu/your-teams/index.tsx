import { ReactComponentElement, useState} from 'react'
import {useSelector} from 'react-redux'
import TeamOneEntity from './teamEntity'

interface YourTeamsProps {
    
}
 
const YourTeams: React.FC<YourTeamsProps> = () => { 

     // load all the teams if the user is  the owner of the workspace 
  // if not , then load only the teams associated with the user(where is at least the member of )

  const authUser = useSelector((state:any)=>state.auth.user)

  const selectedWorkspace = useSelector((state:any)=>state.workspace.selectedWorkSpace)
  // to find your role : selectedWorkspace.membersId[userUid].role

  const teamsList:any[] | [] = useSelector(
    (state: any) => state.team.teamList
  ); 
 

  function returnFilteredTeamList(){
     if(selectedWorkspace.membersId == null || selectedWorkspace.membersId[authUser.uid] == null || teamsList.length <= 0) return []// loading
        if(selectedWorkspace.membersId[authUser.uid].role === "Owner"){
            // you can see all teams in this workspace as Owner
            
            return teamsList.map((team:any)=><TeamOneEntity teamId={team.id} key={team.id}/>)
        }
   
    const filteredTeamList:any[] = []
 
            teamsList.forEach((team)=>{
                const isUserATeamMember = Object.hasOwn(team.membersId,authUser.uid)
                if(isUserATeamMember){
                    filteredTeamList.push(<TeamOneEntity teamId={team.id} key={team.id}/>)
                }
            })
            return filteredTeamList
  }



    return (  
        <>
        <div className="team-list">
            <div className="team-list__title">
                Your teams
            </div>
            <div className="team-list__item-list">
               {returnFilteredTeamList()}
            </div>
        </div>
        
        </>
    );
}
 
export default YourTeams;