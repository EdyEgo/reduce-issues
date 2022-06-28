
import TeamAccordion from './teamAccordion'
import {useState} from 'react'

interface TeamEntityProps {
    teamObject:{id:string,name:string,photoURL:null | string,identified:string}
}
 
const TeamEntity: React.FC<TeamEntityProps> = ({teamObject}) => {

    const [expanded,setExpanded] = useState(false)


    return ( <div className="one-team-item"><TeamAccordion expanded={expanded} setExpanded={setExpanded} teamObject={teamObject} /></div> );
}
 
export default TeamEntity;