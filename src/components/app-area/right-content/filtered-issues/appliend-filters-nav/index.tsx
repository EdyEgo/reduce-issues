import {useSelector} from 'react-redux'

interface AppliedFiltersNavBarProps {
    
}
 
const AppliedFiltersNavBar: React.FC<AppliedFiltersNavBarProps> = () => {
  // filtersListOrder
    const customFilters = useSelector((state:any)=>state.filtersIssues.viewFilters)
    const filtersListOrder = useSelector((state:any)=>state.filtersIssues.filtersListOrder)
 console.log('hey mate',customFilters,'kk',filtersListOrder)
    return (  
        <div className="appliend-filters-container">
            appliend filters
        </div>
    );
}
 
export default AppliedFiltersNavBar;