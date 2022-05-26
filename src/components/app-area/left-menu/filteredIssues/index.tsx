import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

interface FilteredIssuesProps {
    
}
 
const FilteredIssues: React.FC<FilteredIssuesProps> = () => {
    
   const selectedWorkspace = useSelector((state:any)=>state.workspace.selectedWorkSpace)

    return ( <><Link to={`/${selectedWorkspace.workspaceURL}/filtered-issues`}>My issues</Link></> );
}
 
export default FilteredIssues;