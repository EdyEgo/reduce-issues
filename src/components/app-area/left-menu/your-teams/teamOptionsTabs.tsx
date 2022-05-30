import WysiwygSharpIcon from '@mui/icons-material/WysiwygSharp';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BacklogIcon from '@mui/icons-material/BlurOn'
import ActiveIcon from '@mui/icons-material/HourglassTop';
import {Link , useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {changeSelectedTabAppAreaLink,changeSelectedTabAppAreaName,changeTabAreaStaticTabSelection,} from '../../../../store/selectedTab'


interface TeamOptionsTabsProps {
    teamObject:{id:string,name:string,photoURL:null | string,identified:string}
}
 
const TeamOptionsTabs: React.FC<TeamOptionsTabsProps> = ({teamObject}) => { 

  const dispatch = useDispatch()

  const navigate = useNavigate()
   
    const selectedWorkspace = useSelector(
        (state: any) => state.workspace.selectedWorkSpace
      )

      function returnFitTabNameForEndLink(tabEndLinkName:"all" | "active" | "backlog"){
          const issuesNames:{[key:string]:string} = {
            all:"Issues",
            active:"Active Issues",
            backlog: "Backlog Issues"
          }
          return issuesNames[tabEndLinkName]
      }

      function changeRouteToTeamTab(tabEndLinkName:"all" | "active" | "backlog"){
       
        const generalLink = `/${selectedWorkspace.workspaceURL.toLowerCase()}/team/${teamObject.identified.toLowerCase()}/${tabEndLinkName}`

        dispatch(changeSelectedTabAppAreaLink(generalLink))
          const tabName = returnFitTabNameForEndLink(tabEndLinkName)

        dispatch(changeSelectedTabAppAreaName(tabName))
    
        dispatch(changeTabAreaStaticTabSelection("isTeamTab"))
    
        navigate(generalLink)
      }



    return (
      <>
        <div className="team-options flex flex-col">
            <div className="team-options__issue flex flex-col">
               <div onClick={()=>{changeRouteToTeamTab("all")}} className="issue flex my-1 cursor-pointer hover:bg-gray-200 p-1 rounded-md transition-all ease">
                    <AssignmentIcon/>
                    <div className="issue">Issues</div>
               </div>
               <div className="issues-filtered-tabs ml-2 border-l  mt-2 flex flex-col gap-2 ">
                    <div onClick={()=>{changeRouteToTeamTab("active")}}  className="team-options__active flex cursor-pointer hover:bg-gray-200 p-1 ml-1  rounded-md transition-all ease">
                         <ActiveIcon/>
                         <div className="issue">Active</div>
                    </div>
                    <div onClick={()=>{changeRouteToTeamTab("backlog")}} className="team-options__backlog flex cursor-pointer hover:bg-gray-200 p-1 ml-1 rounded-md transition-all ease">
                            <BacklogIcon/>
                           <div className="issue">Backlog</div>
                    </div>
               </div>
            </div>

        </div>
      </>
    );
}
 
export default TeamOptionsTabs;