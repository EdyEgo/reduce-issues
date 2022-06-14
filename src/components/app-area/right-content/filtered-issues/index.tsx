import AppliendFilters from './appliend-filters-nav'
import IssuesListViewMode from './issuesList/issuesListViewModeList'

interface FilteredIssuesProps {
    
}
 
const FilteredIssues: React.FC<FilteredIssuesProps> = () => {
   // a grouping component , and an issue component 


   // later we can add another view mode , ex card



    return (  
        <div className="filtered-issues-content-container">
            <div className="appliend-filters">
                <AppliendFilters/>
            </div>
            <div className="issues-list">
              <IssuesListViewMode/>
            </div>
        </div>
    );
}
 
export default FilteredIssues;