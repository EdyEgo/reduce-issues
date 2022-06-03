import AppliendFilters from './appliend-filters-nav'

interface FilteredIssuesProps {
    
}
 
const FilteredIssues: React.FC<FilteredIssuesProps> = () => {
   // a grouping component , and an issue component 
   

    return (  
        <div className="filtered-issues-content-container">
            <div className="appliend-filters">
                <AppliendFilters/>
            </div>
            <div className="issues-list">
        
            </div>
        </div>
    );
}
 
export default FilteredIssues;