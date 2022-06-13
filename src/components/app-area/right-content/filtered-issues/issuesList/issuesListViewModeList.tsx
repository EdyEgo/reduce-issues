import {useSelector} from 'react-redux'
import GroupedIssuesList from './gruppingIssues'

interface IssuesListViewModeListProps {
    
}
 
const IssuesListViewModeList: React.FC<IssuesListViewModeListProps> = () => {
 // first the issues pass through the plus filters then through the view filters
 // soo if an issues has an selected element that matches any element within filtersListOrder he shall pass
 // then is ordered buy view and some lements are not showned by selecting and diselecting the display properties


//    const customFilters = useSelector()
   const viewFilters = useSelector((state:any)=>state.filtersIssues.viewFilters)
   console.log('my filters',viewFilters)

    return (  
        <div className="issues-list-view-mode-list">
             <GroupedIssuesList/>
        </div>
    );
}
 
export default IssuesListViewModeList;