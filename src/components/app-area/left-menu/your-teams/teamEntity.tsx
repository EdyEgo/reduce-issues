import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

interface TeamEntityProps {
    teamId:string
}
 
const TeamEntity: React.FC<TeamEntityProps> = ({teamId}) => {
    
    const teamsList:any[] | [] = useSelector(
        (state: any) => state.team.teamList
      ); 
      const selectedWorkspace = useSelector(
        (state: any) => state.workspace.selectedWorkSpace
      )// take the id

  // use identified in you links , and add a store for selected tabs
  // the link should look like soo , workspaceIdentifier/team/teamIdentifier/selectedTab(ex: all , active , backlog)
 //

    return ( <div className="one-team-item">{teamId}</div> );
}
 
export default TeamEntity;