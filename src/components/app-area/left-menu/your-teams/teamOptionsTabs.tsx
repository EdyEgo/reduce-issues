import WysiwygSharpIcon from '@mui/icons-material/WysiwygSharp';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BacklogIcon from '@mui/icons-material/BlurOn'
import ActiveIcon from '@mui/icons-material/HourglassTop';
import {Link} from 'react-router-dom'

interface TeamOptionsTabsProps {
    teamObject:{id:string,name:string,photoURL:null | string,identified:string}
}
 
const TeamOptionsTabs: React.FC<TeamOptionsTabsProps> = ({teamObject}) => {
    return (
      <>
        <div className="team-options flex flex-col">
            <div className="team-options__issue flex flex-col">
               <Link to={``} className="issue flex my-1 cursor-pointer hover:bg-gray-200 p-1">
                    <AssignmentIcon/>
                    <div className="issue">Issues</div>
               </Link>
               <div className="issues-filtered-tabs ml-2 border-l  mt-2 flex flex-col gap-2 ">
                    <Link to={``} className="team-options__active flex cursor-pointer hover:bg-gray-200 p-1">
                         <ActiveIcon/>
                         <div className="issue">Active</div>
                    </Link>
                    <Link to={``} className="team-options__backlog flex cursor-pointer hover:bg-gray-200 p-1">
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