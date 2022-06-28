import AppliendFilters from './appliend-filters-nav'
import IssuesListViewMode from './issuesList/issuesListViewModeList'

interface FilteredIssuesProps {
    filterMyIssue?:boolean,
    filterActiveIssues?:boolean,
    filterBackLogIssues?:boolean,
    useSearch?:true
}
 
const FilteredIssues: React.FC<FilteredIssuesProps> = ({filterMyIssue,filterActiveIssues,filterBackLogIssues,useSearch}) => {
   // a grouping component , and an issue component 


   // later we can add another view mode , ex card



    return (  
        <div className="filtered-issues-content-container">
            <div className="appliend-filters">
                <AppliendFilters/>
            </div>
            <div className="issues-list">
              <IssuesListViewMode filterMyIssue={filterMyIssue} useSearch={useSearch}
              filterActiveIssues={filterActiveIssues} filterBackLogIssues={filterBackLogIssues}/>
            </div>
        </div>
    );
}
 
export default FilteredIssues;