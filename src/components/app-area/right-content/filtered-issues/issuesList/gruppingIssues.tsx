import {useSelector} from 'react-redux'

interface GrouppingIssuesProps {
    
}
 
const GrouppingIssues: React.FC<GrouppingIssuesProps> = () => {
   
    const viewFilters = useSelector((state:any)=>state.filtersIssues.viewFilters)
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