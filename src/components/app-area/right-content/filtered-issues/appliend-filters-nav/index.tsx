import {useSelector} from 'react-redux'
import LabelFilterTab from './labelFilterTab'
import UsersFilterTab from './userFilterTab'

interface AppliedFiltersNavBarProps {
    
}
 
const AppliedFiltersNavBar: React.FC<AppliedFiltersNavBarProps> = () => {
  // filtersListOrder
    const customFilters = useSelector((state:any)=>state.filtersIssues.viewFilters)
    const filtersListOrder = useSelector((state:any)=>state.filtersIssues.filtersListOrder)
 console.log('hey mate',customFilters,'kk',filtersListOrder)
    return (  
        <div className="appliend-filters-container border-t mt-2 pt-2">
            <div className="applied-filters-list grid grid-cols-2 grid-row-2">
                 {filtersListOrder.status.length >= 1 &&<div className="status-filter ">
                     <LabelFilterTab labelStatesPlural='states' labelTitle='Status' labelType='status' representativLabelIconName='backlog' />
                 </div>}

                 {filtersListOrder.labels.length >= 1 &&<div className="labels-filter">
                     <LabelFilterTab labelStatesPlural='labels' labelTitle='Labels' labelType='labels' representativLabelIconName='labelFeature' />
                 </div>}

                 {filtersListOrder.priority.length >= 1 &&<div className="priority-filter">
                     <LabelFilterTab labelStatesPlural='priorities' labelTitle='Priority' labelType='priority' representativLabelIconName='priorityHigh' />
                 </div>}

                 {
                    filtersListOrder.assignee.length >= 1 && 
                        <div className="assignee-filter">
                            <UsersFilterTab type='assignee'/>
                        </div>
                 }

                 {
                    filtersListOrder.creator.length >= 1 && 
                        <div className="creator-filter">
                            <UsersFilterTab type='creator'/>
                        </div>
                 }
            </div>
        </div>
    );
}
 
export default AppliedFiltersNavBar;