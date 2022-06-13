import {useSelector} from 'react-redux'
import LabelFilterTab from './labelFilterTab'
import UsersFilterTab from './userFilterTab'

interface AppliedFiltersNavBarProps {
    
}
 
const AppliedFiltersNavBar: React.FC<AppliedFiltersNavBarProps> = () => {
  
  
    const filtersListOrder = useSelector((state:any)=>state.filtersIssues.filtersListOrder)

    return (  
        <div className="appliend-filters-container border-t my-3 py-3 border-b">
            <div className="applied-filters-list flex flex-1 flex-wrap gap-4 ml-2">
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