import {  useState} from 'react'
import {useSelector} from 'react-redux'
import TeamOneEntity from './teamEntity'
import GeneralAccordion from '../../../selectors/generalAccourdion'

interface YourTeamsProps {
    
}
 
const YourTeams: React.FC<YourTeamsProps> = () => { 

     // load all the teams if the user is  the owner of the workspace 
  // if not , then load only the teams associated with the user(where is at least the member of )
 
  const [expanded,setExpanded] = useState(false)

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
            
            return teamsList.map((team:any)=><TeamOneEntity teamObject={team} key={team.id}/>)
        }
   
    const filteredTeamList:any[] = []
 
            teamsList.forEach((team)=>{
                const isUserATeamMember = Object.hasOwn(team.membersId,authUser.uid)
                if(isUserATeamMember){
                    filteredTeamList.push(<TeamOneEntity teamObject={team} key={team.id}/>)
                }
            })
            return filteredTeamList
  }



    return (  
        <>
        <div className="team-list">
 
            <GeneralAccordion expanded={expanded} setExpanded={setExpanded} title={'Your teams'} children={returnFilteredTeamList()}/>
        </div>
        
        </>
    );
}
 
export default YourTeams;