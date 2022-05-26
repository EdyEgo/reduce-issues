import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import TeamAccordion from './teamAccordion'
import {useState} from 'react'

interface TeamEntityProps {
    teamObject:{id:string,name:string,photoURL:null | string,identified:string}
}
 
const TeamEntity: React.FC<TeamEntityProps> = ({teamObject}) => {

    const [expanded,setExpanded] = useState(false)
    
    const teamsList:any[] | [] = useSelector(
        (state: any) => state.team.teamList
      ); 
      const selectedWorkspace = useSelector(
        (state: any) => state.workspace.selectedWorkSpace
      )// take the id

  // use identified in you links , and add a store for selected tabs
  // the link should look like soo , workspaceIdentifier/team/teamIdentifier/selectedTab(ex: all , active , backlog)
 //

    return ( <div className="one-team-item"><TeamAccordion expanded={expanded} setExpanded={setExpanded} teamObject={teamObject} /></div> );
}
 
export default TeamEntity;