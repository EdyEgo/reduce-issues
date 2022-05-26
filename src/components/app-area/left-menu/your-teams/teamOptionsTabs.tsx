import WysiwygSharpIcon from '@mui/icons-material/WysiwygSharp';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BacklogIcon from '@mui/icons-material/BlurOn'
import ActiveIcon from '@mui/icons-material/HourglassTop';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

interface TeamOptionsTabsProps {
    teamObject:{id:string,name:string,photoURL:null | string,identified:string}
}
 
const TeamOptionsTabs: React.FC<TeamOptionsTabsProps> = ({teamObject}) => { 
   
    const selectedWorkspace = useSelector(
        (state: any) => state.workspace.selectedWorkSpace
      )

const generalLink = `/${selectedWorkspace.workspaceURL.toLowerCase()}/team/${teamObject.identified.toLowerCase()}/`

    return (
      <>
        <div className="team-options flex flex-col">
            <div className="team-options__issue flex flex-col">
               <Link to={`${generalLink}all`} className="issue flex my-1 cursor-pointer hover:bg-gray-200 p-1 rounded-md">
                    <AssignmentIcon/>
                    <div className="issue">Issues</div>
               </Link>
               <div className="issues-filtered-tabs ml-2 border-l  mt-2 flex flex-col gap-2 ">
                    <Link to={`${generalLink}active`} className="team-options__active flex cursor-pointer hover:bg-gray-200 p-1 ml-1  rounded-md">
                         <ActiveIcon/>
                         <div className="issue">Active</div>
                    </Link>
                    <Link to={`${generalLink}backlog`} className="team-options__backlog flex cursor-pointer hover:bg-gray-200 p-1 ml-1 rounded-md">
                            <BacklogIcon/>
                           <div className="issue">Backlog</div>
                    </Link>
               </div>
            </div>

        </div>
      </>
    );
}
 
export default TeamOptionsTabs;