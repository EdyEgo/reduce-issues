import {useSelector,useDispatch} from 'react-redux'
import {changeSelectedTabAppAreaLink,changeSelectedTabAppAreaName,changeTabAreaStaticTabSelection,changeSeletedTeamId} from '../../../../store/selectedTab'
import {Link,useNavigate} from 'react-router-dom'

interface FilteredIssuesProps {
    
}
 
const FilteredIssues: React.FC<FilteredIssuesProps> = () => {

 const dispatch = useDispatch()
 const navigate = useNavigate()
 const selectedWorkspace = useSelector((state:any)=>state.workspace.selectedWorkSpace)

 function changeRouteToFilteredIssues(){
     const filteredIssuesLink = `/${selectedWorkspace.workspaceURL}/filtered-issues`
     
   
    dispatch(changeSelectedTabAppAreaLink(filteredIssuesLink))

    dispatch(changeSelectedTabAppAreaName("My Issues"))

    dispatch(changeSeletedTeamId(null))

    dispatch(changeTabAreaStaticTabSelection("isMyIssues"))

    navigate(filteredIssuesLink)
 } 
    
  

    return ( <div className="cursor-pointer" onClick={changeRouteToFilteredIssues}>My issues</div> );
}
 
export default FilteredIssues;