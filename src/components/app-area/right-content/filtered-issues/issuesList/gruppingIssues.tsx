import {useSelector} from 'react-redux'
import filterTeamIssues from '../../../../../services/issues/filterIssues'

interface GrouppingIssuesProps {
    
}
 
const GrouppingIssues: React.FC<GrouppingIssuesProps> = () => {
   
    const viewFilters = useSelector((state:any)=>state.filtersIssues.viewFilters)
    
   const filtersListOrder  = useSelector((state:any)=>state.filtersIssues.filtersListOrder)

    const selectedTeamId = useSelector((state:any)=>state.selectedTab.selectedTabAppArea.selectedTeamId)
    const teamIssues = useSelector((state:any)=>state.issues.teamsIssues)
    const selectedTeamIssues = teamIssues[selectedTeamId] != null ? teamIssues[selectedTeamId] : []
     
    const filteredIssuesList = filterTeamIssues(filtersListOrder,selectedTeamIssues)
    console.log('you filter by this selectedTeamIssues',filteredIssuesList)
    const useDefaultViewFilters = viewFilters.custom.empty ? viewFilters.default : viewFilters.custom
    const listIsGrouped = useDefaultViewFilters.groupingBy !== "none" 

    return (  
       <>
        {listIsGrouped && 

            <div className="grouped-issues-list">
                goruped isses list by {useDefaultViewFilters.groupingBy}
            </div>
        
        }

       {listIsGrouped === false &&

            <div className="ungrouped-issues-list">
                ungrouped issues list
            </div>
        }
       </>
    );
}
 
export default GrouppingIssues;